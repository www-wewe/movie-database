import { number, object, string } from "yup";

export const movieFormSchema = object().shape({
    title: 
        string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters long")
        .max(20, "Title must be at most 20 characters long"),
    
    originalTitle:
        string()
        .required()
        .min(2, "Original title must be at least 2 characters long")
        .max(20, "Original title must be at most 20 characters long"),
    
    description: 
        string()
        .required("Description is required")
        .min(2, "Description must be at least 2 characters long")
        .max(400, "Description must be at most 100 characters long"),
    
    language:
        string()
        .required("Language is required")
        .min(2, "Language must be at least 2 characters long")
        .max(20, "Language must be at most 100 characters long"),
    
    directorId:
        string()
        .required(),
    
    categoryId:
        string()
        .required(),
    
    cast: 
        string()
        .required(),

    duration: 
        number()
        .required("Duration time is required"),
    
    picture:
        string()
        .optional(),
    
    releaseDate:
        string()
        .optional()
});