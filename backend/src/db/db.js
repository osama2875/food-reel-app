const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log('MongoDB connection errer:', err);
        
    })
}

module.exports = connectDB;