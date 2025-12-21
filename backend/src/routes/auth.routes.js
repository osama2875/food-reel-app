const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')

// USER
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)

// FOOD PARTNER
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)

module.exports = router
