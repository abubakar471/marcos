const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

// dotenv
require("dotenv").config();

// connect databse
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("database connected successfully")
    })
    .catch((err) => {
        console.log("error while connecting to databse => ", err)
    })

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})