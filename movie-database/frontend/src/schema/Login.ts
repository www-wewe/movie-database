import { object, string } from "yup";

export const LoginFormSchema = object().shape({
    password:
        string()
        .required()
        .min(7, "Password must be at least 7 characters long"),
    
    email:
        string()
        .email("Enter the valid email format")
        .required()
});