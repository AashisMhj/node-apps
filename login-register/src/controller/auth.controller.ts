import { Request, Response } from "express";
import bcrypt from "bcrypt";
//
import { loginSchema, registrationSchema } from "../validation";
import { addUser, emailExists } from "../db/model/User";

const SALT_ROUND = 3;

export function login(req:Request, res:Response){
    try {
        // validate data
        const data = loginSchema.validateSync(req.body);
        const email_exist = emailExists(data.email);
        // query user in db
        if(!emailExists) return res.json({
            msg: "Email already Exists"
        });
        // generate jwt and refresh token
        // send to user
        
    } catch (error) {
        // TODO check for validation error
        return res.status(500).json({
            msg: "Server Error"
        });
    }
}

export async function register(req:Request, res:Response){
    try {
        // validate data
        const data = registrationSchema.validateSync(req.body);
        const email_exist = await emailExists(data.email);
        // query db
        if(email_exist) return res.json({
            msg: "Email already Exists"
        });
        const encrypted_password = bcrypt.hashSync(data.password, SALT_ROUND);
        // insert to db
        await addUser(data.email, data.address, data.name, encrypted_password, data.date_of_birth)

        return res.json({
            msg: "User Created"
        })
        
    } catch (error) {
        // TODO check for validation error
        console.log(error);
        return res.json({
            msg: "Server Error"
        });
    }
}