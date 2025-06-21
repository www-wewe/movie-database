import { object, string } from "yup";

export const categoryFormSchema = object().shape({
    name: 
        string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters long")
        .max(20, "Name must be at most 20 characters long"),

    picture: 
        string()
        .optional(),
        
    movies:
        object()
        .optional()
});