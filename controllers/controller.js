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

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email) {throw {name: "Email is required"}}
            if(!password) {throw {name: "Password is required"}}

            const user = await User.findOne({
                where: {email}
            })
            if(!user) {throw {name: "Invalid email or password"}}

            const valid = comparePassword(password, user.password)
            if(!valid) {throw {name: "Invalid email or password"}}

            const token = signToken({id: user.id, username: user.username, email: user.email })
            res.status(200).json({access_token: token})
        } catch(err) {
            next(err)
        }
    }

    static async getCards(req, res, next) {
        try {
            const cards = await Card.findAll()
            res.status(200).json(cards)
        } catch(err) {
            next(err)
        }
    }

    static async getScores(req, res, next) {
        try {
            const scores = await Score.findAll()
            res.status(200).json(scores)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller