import express from "express";
import {
    getCountInfo
} from "../controller/redis-data";

const router = express.Router();

router.get('/', getCountInfo);

export default router;