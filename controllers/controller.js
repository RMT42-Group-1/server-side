const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { signToken, verifyToken } = require("../helpers/jwt")
const {User, Score, Card} = require("../models")

class Controller {
    static async register(req, res, next) {
        try {
            const {username, email, password} = req.body
            if(!username) {throw {name: "Username is required"}}
            if(!email) {throw {name: "Email is required"}}
            if(!password) {throw {name: "Password is required"}}

            const hashedPass = hashPassword(password)

            const user = await User.create({username, email, password: hashedPass})
            res.status(201).json({username: user.username, email: user.email})
        } catch(err) {  
            next(err)
        }
    }
}

module.exports = Controller