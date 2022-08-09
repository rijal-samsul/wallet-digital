const { wallet, user, transaction } = require("../../models")

exports.transaction = async (req, res) => {
    try {

        const {sender, nominal, receiver} = req.body

        const dataWallet = await wallet.findOne({
            where: {
                idUser: sender
            }
        })

        if (dataWallet.saldo < nominal) {
            return res.status(400).send({
                message: 'maaf saldo anda tidak cukup!',
            });
        }

        const dataTransfer = await wallet.findOne({
            where: {
                idUser: receiver
            }
        })

        const bodyData = {
            saldo: dataTransfer.saldo + parseInt(nominal)
        }

        await wallet.update(bodyData, {
            where: {
                idUser: receiver
            }
        });

        const userWallet = await wallet.findOne({
            where: {
                idUser: sender
            }
        })

        if (userWallet.saldo < req.body.nominal) {
            return res.status(400).send({
                message: 'maaf saldo tidak cukup',
            });
        }

        const dataSaldo = {
            saldo: userWallet.saldo - nominal
        }

        await wallet.update(dataSaldo, {
            where: {
                idUser: sender
            }
        });

        const dataTransaksi = await transaction.create({
            idReceiver: receiver,
            nominal: nominal,
            idSender: sender,
            type: 'Transfer'
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


exports.getTopup = async (req, res) => {
    try {
        let transactions = await transaction.findAll({
            where:{
                idSender:req.user.id
            }
        })
        res.status(200).send({
            transactions
        })
    } catch (error) {
        res.status(400).send({
            status:"server error"
        })
    }
}

exports.transactions = async (req, res) => {

    try {
        let dataTransactions = await transaction.findAll({
            // where:{
            //     sender: req.user.id
            // },
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