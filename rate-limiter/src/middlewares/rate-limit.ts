import { Request, Response, NextFunction } from "express";
import redisClient from "../db/redis-db";
import { getLimitKey } from "../helper/redis-key.helper";

const max_count = parseInt(process.env.MAX_COUNT || '20');

const rateLimiter = async (req:Request, res:Response, next:NextFunction) => {
    const {ip} = req;
    if(ip === undefined){
        // TODO something
        return next();
    }
    const key = getLimitKey(ip);

    // check if IP address is already being rate limited
    const value = await redisClient.get(key) || '0';
    const count = parseInt(value);
    console.log(count);
    if(count > max_count){
        return res.status(504);
    }else if(count === 0){
        await redisClient.set(key, 1, {
            EX: 10
        });
    }else{
        // await redisClient.incr(key,);
        // Changed to set till i find a way to incr and reset at same
        await redisClient.set(key, count+1, {
            EX: 10
        })
    }
    return next();
}

export default rateLimiter;