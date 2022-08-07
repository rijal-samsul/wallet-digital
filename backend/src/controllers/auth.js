const { user } = require("../../models") 

const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(3).required(),
    })

    const { error } = schema.validate(req.body)
    if(error)
        return res.status(400).send({
            error:{
                message: error.details[0].message,
            },
        });
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await user.create({
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign({id: user.id }, process.env.TOKEN_KEY);

        res.status(200).send({
            status: "success",
            data:{
                name: newUser.name,
                email: newUser.email,
                token,
            },
        });
    }catch (error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
}

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);

    if(error)
        return res.status(400).send({
            error:{
                message: error.details[0].message,
            },
        });
    try{
        const userExist = await user.findOne({
            where:{
                email: req.body.email,
            },
            attributes:{
                exclude:["createdAt", "updatedAt"],
            },
        });

        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid){
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

        res.status(200).send({
            status: "success...",
            data:{
                name: userExist.name,
                email: userExist.email,
                token,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status:"failed",
            message: "server error",
        });
    }
}