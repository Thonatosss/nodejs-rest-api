import { HttpError } from "../helpers/index.js";

const validateBody = schema => {
    const f = (req, res, next) => { 
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(404, error.message));
        }
        next();
    }
    return f;

}

export default validateBody;