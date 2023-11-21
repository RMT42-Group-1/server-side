function errorHandler(err, req, res, next) {
    console.log(err)
    switch(err.name) {
        case "Username is required":
        case "Email is required":
        case "Password is required":
            res.status(400).json({message: err.name})
            break
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: err.message})
            break
        case "SequelizeValidationError":
            res.status(400).json({message: err.errors[0].message})
            break
        case "Invalid email or password":
            res.status(401).json({message: err.name})
            break
        case "JsonWebTokenError":
            res.status(401).json({message: "Unauthenticated"})
            break
        default:
            res.status(500).json({message: "Internal server error"})
    }
}

module.exports = errorHandler