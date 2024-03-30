import {object, string, number, date, InferType} from "yup";

export const registrationSchema = object({
    name: string().required(),
    email: string().email().required(),
    password: string().min(8).required(),
    confirm_password: string().min(8).required(),
    date_of_birth: date().required(), // TODO set min and max value
    address: object({
        street: string().required(),
        city: string().required(),
        state: string().required(),
        zip: string().required()
    }).required(),
});

export const loginSchema = object({
    email: string().email().required(),
    password: string().required().min(8)
})