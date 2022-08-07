const { user, wallet } = require("../../models")

exports.addUSer = async (req, res) => {
    try{
        const data = req.body;
        const newData = await user.create(data);

        res.status(200).send({
            status:"success",
            data: newData,
        });
    }catch(error){
        console.log(error);
        res.send({
            status:"failed",
            message:"server error",
        });
    }
};

exports.getUsers = async (req, res) => {
    try{
        const users = await user.findAll({
            include:{
                model: wallet,
                as: "wallet",
            },
        });

        res.status(200).send({
            status: "success",
            data: {
                users,
            },
        });
    }catch(error){
        console.log(error);
        req.status(500).send({
            status:"failed",
            messgae:"server error"
        })
    }
}


exports.getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const dataSpec = await user.findAll({
            where:{id},
        });

        res.status(200).send({
            status: "success",
            data:{
                dataSpec,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            messgae:"server error"
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        await user.update(req.body, {
            where: { id },
        });

        res.status(200).send({
            status: "success",
            message: `update user id: ${id}`,
            data: req.body,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            messgae: "server error"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        await user.destroy({
            where:{ id },
        });

        res.status(200).send({
            status: "success",
            messgae: `delete id user ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};