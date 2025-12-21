const express = require('express')
const multer = require('multer')
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
})

// PUBLIC
router.get('/', foodController.getFoodItems)

// PARTNER ONLY
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('video'),
  foodController.createFood
)

// USER ONLY
router.post(
  '/like',
  authMiddleware.authUserMiddleware,
  foodController.likeFood
)

router.post(
  '/save',
  authMiddleware.authUserMiddleware,
  foodController.saveFood
)

module.exports = router
