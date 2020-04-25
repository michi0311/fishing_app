const user = require('../models/index').user;
const hashTool = require("../helpers/hashTool")
const validator = require('validator');

module.exports = {
    async create (req,res) {
        try {
            if (validator.isEmpty(req.body.username || "")) {
                return res.status(400).send({ error: "No username provided" })
            }  else if (validator.isEmpty(req.body.password || "")) {
                return res.status(400).send({ error: "No password provided" })
            }

            const userCollection = await user.create({
                username: req.body.username,
                email: req.body.email,
                password: hashTool.createHash(req.body.password)
            })

            if (!userCollection) {
                return res.status(400).send({ error: 'User creation unsuccesfull' })
            } else {
                //mail.sendConfirmation(req.body.email, req.body.firstname, req.body.lastname)
                delete userCollection.dataValues["password"]
                res.status(200).send({ user: userCollection });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getByID (req,res) {
        try {
            const userCollection = await user.findByPk(parseInt(req.params.id));
            if (userCollection) {
                delete userCollection.dataValues["password"]
                res.status(200).send({ user: userCollection });
            } else {
                res.status(400).send({error: "User not found"})
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async getAllUsers (req,res) {
        try {
            const userCollection = await user.findAll({attributes: { exclude: ["user.password"] }})
            res.status(200).send({user: userCollection})
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    async updateUser (req,res) {
        try {
            const _id = req.params.id;
            const updates = Object.keys(req.body);
            const allowedUpdates = ["username", "email","password"];
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
            if (!isValidOperation) {
                return res.status(400).send({ error: "Invalid Updates" })
            }

            const userCollection = await user.findByPk(parseInt(req.params.id));
            if (!userCollection) {
                return res.status(404).send({ msg: "User not found" });
            }

            if (req.body.password) {
                req.body.password = await hashTool.createHash(req.body.password);
            }

            const userReturn = await user.update(req.body, { where: { id: _id } }) 
            if (userReturn[0] === 0) {
                return res.status(404).send({ error: "Update failed" })
            }
            res.status(200).send({ msg: "Update Successfull" })
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },

    //TODO update and delte only your user

    async deleteUser (req,res) {
        try {
            try {
                const _id = req.params.id;
                const userCollection = await user.findByPk(parseInt(_id));
                if (userCollection) {
                    //if there already exists a booking from the user, the user doesn't get deleted
                    userCollection.destroy();
    
                    res.status(200).send({
                        msg: "Succesfully deleted!",
                        user: userCollection
                    });
                } else {
                    res.status(404).send({ msg: "User not found" });
                }
        
        } catch (e) {
            console.log(e);
            res.status(500).send(e)
        }
    },
}