const { wallet, user, transaction } = require("../../models")
const midtransClient = require("midtrans-client");

exports.topUp = async (req, res) => {
    try {
        let data = req.body
        data = {
            id: parseInt(req.user.id + Math.random().toString().slice(3, 8)),
            idSender: req.user.id,
            idReceiver: req.user.id,
            nominal: req.body.nominal,
            email:req.body.email,
            name:req.body.name,
            type: "Topup"
        }

        const newData = await transaction.create(data);

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        let parameter = {
            transaction_details: {
                order_id: newData.id,
                gross_amount: newData.nominal,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                name: data?.name,
                email: data?.email
            },
        };

        const payment = await snap.createTransaction(parameter);

        res.status(200).send({
            status:"success",
            payment
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"failed"
        })
    }
}

const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY,
});

/**
 *  Handle update transaction status after notification
 * from midtrans webhook
 * @param {string} status
 * @param {transactionId} transactionId
 */

exports.notification = async (req, res) => {
    try {
        const statusResponse = await core.transaction.notification(req.body);
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;
        if (transactionStatus == "capture") {
            if (fraudStatus == "challenge") {
                res.status(200);
            } else if (fraudStatus == "accept") {
                updateSaldo(orderId)
                res.status(200);
            }
        } else if (transactionStatus == "settlement") {
            updateSaldo(orderId)
            res.status(200);
        } else if (
            transactionStatus == "cancel" ||
            transactionStatus == "deny" ||
            transactionStatus == "expire"
        ) {
            res.status(200);
        } else if (transactionStatus == "pending") {
            res.status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};


const updateSaldo = async (orderId) => {
    const transactionData = await transaction.findOne({
        where: {
            id: orderId,
        },
        include: [
            {
                model: wallet,
                as: 'receiver',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
            },
            {
                model: wallet,
                as: 'sender',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
            }
        ],
    });
    const body = {
        saldo: transactionData.receiver.saldo + parseInt(transactionData.nominal)
    }

    await wallet.update(body, {
        where:{
            idUser: transactionData.idReceiver
        }
    });
};


exports.transactions = async (req, res) => {

    try {
        let dataTransactions = await transaction.findAll({
            include: [
                {
                    model: wallet,
                    as: 'receiver',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                },
                {
                    model: wallet,
                    as: 'sender',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                }
            ],
        })

        // console.log(data);
        const dataSender = dataTransactions.filter((item) => item.sender.id === req.user.id)
        const dataReceiver = dataTransactions.filter((item) => item.receiver.id === req.user.id)

        let data = dataSender.concat(dataReceiver)
        data = [...new Map(data.map(item => [item['id'], item])).values()]

        data.sort((a, b) => b.createdAt - a.createdAt)

        res.send({
            status: 'success',
            data
            // dataTransactions
        })

    } catch (error) {
        console.log(error);
    }
}