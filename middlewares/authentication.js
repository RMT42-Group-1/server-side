const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models")

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        console.log("ACCESSSSS")
        if(!access_token) {throw {name: "Unauthenticated"}}
        
        let payload = verifyToken(access_token.split(" ")[1])
        let user = await User.findByPk(payload.id)
        if(!user) {throw {name: "Unauthenticated"}}

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authentication
