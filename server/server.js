import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// dotenv
dotenv.config();

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
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})