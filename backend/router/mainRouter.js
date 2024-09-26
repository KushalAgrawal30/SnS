const express = require('express')
const mainController = require('../controller/mainController')

const router = express.Router()

router.post('/signup',mainController.createUser);
router.post('/login',mainController.loginUser)
router.post('/upload',mainController.getImage)
router.get('/getData',mainController.sendData)

module.exports = router