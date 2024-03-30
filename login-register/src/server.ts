import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./db/index";
import router from "./routes";

// app values
const PORT = process.env.PORT || 5001;
const app = express();

db.$connect().then(() => console.log('Database Connected')).catch((err) => console.log('Database connection Error', err))

// app config
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () =>{
    console.log(`Server Started at: ${PORT}`);
})