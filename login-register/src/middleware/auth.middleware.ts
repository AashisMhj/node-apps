import {Request, Response, NextFunction} from "express";

export function authUser(req:Request, res:Response, next:NextFunction){
    // check if the jwt is valid
    next();
}