const bcrypt = require("bcryptjs")

const hashPassword = (password => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    return hash
})

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {hashPassword, comparePassword}