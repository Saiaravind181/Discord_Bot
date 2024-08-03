const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const ownerRoutes = require('./routes/ownerRoutes');
require("dotenv").config();
const client = require('./utils/discordBot'); 


app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/owner", ownerRoutes );

connectDB();
client;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});