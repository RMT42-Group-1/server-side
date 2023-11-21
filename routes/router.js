const express = require('express')
const Controller = require('../controllers/controller')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Birds home page')
})

router.post("/register", Controller.register)

router.use(errorHandler)
module.exports = router
