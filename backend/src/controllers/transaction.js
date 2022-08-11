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
            type: "Topup",
            status: "Pending"
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
                handleStatus("Success", orderId)
                updateSaldo(orderId)
                res.status(200);
            }
        } else if (transactionStatus == "settlement") {
            handleStatus("Success", orderId)
            updateSaldo(orderId)
            res.status(200);
        } else if (
            transactionStatus == "cancel" ||
            transactionStatus == "deny" ||
            transactionStatus == "expire"
        ) {
            handleStatus("Cancel", orderId)
            res.status(200);
        } else if (transactionStatus == "pending") {
            handleStatus("Pending", orderId)
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
                model:user,
                as: 'receiver',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
                include:[
                    {
                        model:wallet,
                        as:"wallet"
                    }
                ]
            },
            {
                model: user,
                as: 'sender',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
            }
        ],
    });

    const body = {
        saldo: transactionData?.receiver?.wallet?.saldo + transactionData?.nominal
    }

    await wallet.update(body, {
        where:{
            idUser: transactionData?.idReceiver,
        }
    });
};


const handleStatus = async (status, transactionId) => {
    await transaction.update(
        {
            status,
        },
        {
            where: {
                id: transactionId,
            },
        }
    );
};

exports.transfer = async (req, res) => {
    try {

        const sender = await wallet.findOne({
            where: {
                idUser: req.user.id
            }
        })

        const receiver = await wallet.findOne({
            where: {
                idUser: req.body.receiver
            }
        })

        if (sender.saldo < req.body.nominal) {
            return res.status(400).send({
                message: 'Maaf saldo anda tidak cukup!',
            });
        }

        const tambahSaldo = {
            saldo: receiver.saldo + parseInt(req.body.nominal)
        }

        await wallet.update(tambahSaldo, {
            where: {
                idUser: receiver.idUser
            }
        });

        const sisaSaldo = {
            saldo: sender.saldo - req.body.nominal
        }

        await wallet.update(sisaSaldo, {
            where: {
                idUser: sender.idUser
            }
        });

        const dataTransaksi = await transaction.create({
            idReceiver: receiver?.idUser,
            nominal: req.body.nominal,
            idSender: req.user.id,
            type: 'Transfer',
            status:"Success"
        });

        res.status(200).send({
            message: 'Transfer berhasil',
            dataTransaksi
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};


exports.transactions = async (req, res) => {

    try {
        let dataTransactions = await transaction.findAll({
            where:{
                idSender: req.user.id
            },
            include: [
                {
                    model: user,
                    as: 'receiver',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                },
                {
                    model: user,
                    as: 'sender',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                }
            ],
        })


        res.send({
            status: 'success',
            dataTransactions
            // dataTransactions
        })

    } catch (error) {
        console.log(error);
    }
}