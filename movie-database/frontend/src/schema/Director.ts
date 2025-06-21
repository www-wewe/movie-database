import { date, object, string } from "yup";

export const directorFormSchema = object().shape({
    name: 
        string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters long")
        .max(20, "Name must be at most 20 characters long"),

    description: 
        string()
        .required("Description of the director is required")
        .min(10, "Please tell us more about yourself"),
        
    birthDate: 
        date()
        .required("Birth date is required"),
    
    dateOfDeath: 
        date()
        .nullable(),
    
    picture:
        string()
        .nullable()
});