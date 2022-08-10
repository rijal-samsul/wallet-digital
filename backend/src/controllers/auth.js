const { user, wallet } = require("../../models") 

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
        const emailExist = await user.findOne({
            where:{
                email: req.body.email
            }
        })

        if (emailExist){
            return res.status(400).send({
                status: "failed",
                message: "Email already registered!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await user.create({
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await wallet.create({saldo: "0", idUser: newUser.id})

        res.status(200).send({
            status: "Registration Success",
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

        if(!userExist){
            return res.status(400).send({
                status: "failed",
                message: "Email belum terdaftar",
            })
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid){
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

        const dataWalet = await wallet.findOne({
            where:{
                idUser: userExist.id,
            },
            attributes:{
                exclude: ["createdAt", "updatedAt", "idUSer"]
            },
        });

        res.status(200).send({
            status: "success",
            data:{
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                saldo: dataWalet.saldo,
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


exports.checkAuth = async (req, res) => {
    try {
      const id = req.user.id;
  
      const dataUser = await user.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
  
      if (!dataUser) {
        return res.status(404).send({
          status: "failed",
        });
      }

      const dataWalet = await wallet.findOne({
        where:{
            idUser: dataUser.id,
        },

        attributes:{
            exclude:["createdAt", "updatedAt", "idUser"]
        }
      });

      const token = jwt.sign({ id: req.user.id }, process.env.TOKEN_KEY);
  
      res.send({
        status: "success",
        data: {
          user: {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            saldo: dataWalet.saldo,
            token,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
};