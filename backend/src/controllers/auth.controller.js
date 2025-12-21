const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/foodpartner.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// ================= USER =================
async function registerUser(req, res) {
  const { fullName, email, password } = req.body

  const isUserAlreadyExists = await userModel.findOne({ email })
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
  })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax'
  })

  res.status(201).json({
    message: 'User registered successfully',
    user
  })
}

async function loginUser(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax'
  })

  res.status(200).json({
    message: 'User logged in successfully',
    user
  })
}

// ================= FOOD PARTNER =================
async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body

  const exists = await foodPartnerModel.findOne({ email })
  if (exists) {
    return res.status(400).json({ message: 'Food partner already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName
  })

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax'
  })

  res.status(201).json({
    message: 'Food partner registered successfully',
    foodPartner
  })
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body

  const foodPartner = await foodPartnerModel.findOne({ email })
  if (!foodPartner) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password)
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET)

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax'
  })

  res.status(200).json({
    message: 'Food partner logged in successfully',
    foodPartner
  })
}

module.exports = {
  registerUser,
  loginUser,
  registerFoodPartner,
  loginFoodPartner
}
