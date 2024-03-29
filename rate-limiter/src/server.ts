import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import redisClient from "./db/redis-db";
import rateLimiter from "./middlewares/rate-limit";
import router from "./routes/index";

// app values
const PORT = 5000;
const MAX_COUNT = 2;
dotenv.config();
// server configuration
const app = express();
redisClient.on('error', err => {
    console.log('Redis Client Error: ', err);
})
.on('connect', () => {
    console.log('Redis is Running i guess');
})
.connect();

// app setup
app.use(rateLimiter);
app.use(router);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})