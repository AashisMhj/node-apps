import { AddressType } from "../../types";
import db from "../index";
export async function getUsers(){
    return db.user.findMany();
}

export async function getUser(id:string){
    return db.user.findFirst({
        where: {id}
    })
}

export async function emailExists(email:string){
    const data = await db.user.findFirst({
        where: {email}
    });
    return !!data;
}

export async function addUser(email:string, address:AddressType, name:string, password:string, date_of_birth:Date){
    return db.user.create({
        data: {
            email,
            address,
            name,
            password,
            date_of_birth
        }
    })
}