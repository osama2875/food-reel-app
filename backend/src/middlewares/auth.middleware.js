const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')

// FOOD PARTNER AUTH
exports.authFoodPartnerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const foodPartner = await foodPartnerModel.findById(decoded.id)

    if (!foodPartner) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.foodPartner = foodPartner
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

// USER AUTH
exports.authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
