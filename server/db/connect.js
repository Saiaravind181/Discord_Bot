const mongoose = require('mongoose');
require('dotenv').config();

const connectDB =  async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports =connectDB;