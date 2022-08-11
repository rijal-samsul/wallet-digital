const { wallet, user } = require("../../models")

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
            data
        })
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server failed",
        });
    }
};

exports.getWallets = async (req, res) => {
    try {
        let wallets = await wallet.findAll({
            include:{
                model: user,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                },
            },
        })

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