// create server 

const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const cors = require('cors')

const app = express()

app.use(cookieParser())
app.use(express.json())

// ✅ CORS FIX (localhost + vercel dono allowed)
app.use(cors({
  origin: [
    'http://localhost:5173',                 // local development
    'https://food-reel-app-weld.vercel.app'  // vercel frontend
  ],
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('Server is live now')
})

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)

module.exports = app
