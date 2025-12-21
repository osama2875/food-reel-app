const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const { v4: uuid } = require('uuid')

// CREATE FOOD (partner only)
async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Video file is required' })
    }

    const uploadResult = await storageService.uploadeFile(
      req.file.buffer,
      uuid()
    )

    const foodItem = await foodModel.create({
      name: req.body.name,
      video: uploadResult.url,
      description: req.body.description,
      foodPartner: req.foodPartner._id,
      likeCount: 0
    })

    res.status(201).json({
      message: 'Food item created successfully',
      food: foodItem
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create food item' })
  }
}

// GET ALL FOOD (PUBLIC)
async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({})
    res.status(200).json({ foodItems })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food items' })
  }
}

// LIKE / UNLIKE FOOD
async function likeFood(req, res) {
  const { foodId } = req.body
  const user = req.user

  const alreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId
  })

  if (alreadyLiked) {
    await likeModel.deleteOne({ user: user._id, food: foodId })
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } })

    return res.json({ message: 'Food unliked successfully' })
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId
  })

  await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } })

  res.status(201).json({ message: 'Food liked successfully', like })
}

// SAVE / UNSAVE FOOD
async function saveFood(req, res) {
  const { foodId } = req.body
  const user = req.user

  const alreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if (alreadySaved) {
    await saveModel.deleteOne({ user: user._id, food: foodId })
    return res.json({ message: 'Food unsaved successfully' })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })

  res.status(201).json({ message: 'Food saved successfully', save })
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood
}
