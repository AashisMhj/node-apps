import { Request, Response } from "express";
import {getLimitKey} from "../helper/redis-key.helper";
import redisClient from "../db/redis-db";

export const getCountInfo = async (req:Request, res:Response) => {
    const {ip} = req;
    if(!ip){
        return res.json({
            msg: "Seems you don't have any ip"
        });
    }
    const key = getLimitKey(ip);
    const count = await redisClient.get(key);
    return res.json({
        ip,
        count
    })
}

export default {
    getCountInfo
}