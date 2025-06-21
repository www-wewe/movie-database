import { number, object, string } from "yup";

export const ReviewFormSchema = object().shape({
    content:
        string()
        .required()
        .min(10, "Your review must be at least 10 characters long")
        .max(150, "Your review must be at most 150 characters long"),
    
    rating:
        number()
        .max(10, "Maximum value of your rating can be 10")
        .min(0, "Minimum value of your rating can be 0")
        .required()

});