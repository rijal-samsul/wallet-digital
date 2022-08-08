const { wallet, user, transaction } = require("../../models")

exports.getWallet = async (req, res) => {
    try{
        const idUser = req.user.id;
        const data = await wallet.findOne({
            where:{
                idUser,
            },
            include:{
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            },
        });
        res.send({
            status:"success",
            data,
        })
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server failed",
        });
    }
};

exports.updateWallet = async (req, res) => {
    try{
        const data = await wallet.findOne({
            where:{
                idUser: req.user.id,
            }
        })

        const body = {
            saldo: data.saldo + parseInt(req.body.saldo)
        }

        await wallet.update(body, {
            where:{
                idUser: req.user.id,
            }
        });

        await transaction.create({
            nominal: req.body.saldo,
            idSender: req.user.id,
            idReceiver: req.user.id,
            type: "Topup"
        });

        res.status(200).send({
            message: "topup success",
            body,
            data: req.body.saldo,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error",
        })
    }
}

exports.getWallets = async (req, res) => {
    try {
        let wallets = await user.findAll()

        res.status(200).send({
            status:"success",
            wallets
        })
    } catch (error) {
        res.status(400).send({
            status:"error"
        })
    }
}