const express = require('express');
const Controller = require('../controllers/controller');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Birds home page');
});

router.post('/register', Controller.register);
router.post('/login', Controller.login);

router.use(authentication);

router.get('/cards', Controller.getCards);
router.get('/scores', Controller.getScores);

router.use(errorHandler);
module.exports = router;
