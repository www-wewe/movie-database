import { object, string } from "yup";

export const UserFormSchema = object().shape({
    userName:
        string()
        .required()
        .min(2, "Your name must be at least 2 characters long")
        .max(20, "Your name must be at most 20 characters long"),

    avatar:
        string()
        .optional(),

    password:
        string()
        .required()
        .min(7, "Password must be at least 7 characters long"),
    
    email:
        string()
        .email()
        .required()
});

export const UserFormUpdateSchema = object().shape({
    userName:
        string()
        .required()
        .min(2, "Your name must be at least 2 characters long")
        .max(20, "Your name must be at most 20 characters long"),
    
    avatar:
        string()
        .optional(),
});