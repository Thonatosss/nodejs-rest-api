import Joi from "joi"
const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const contactUpdateFavSchema = Joi.object({
    favorite: Joi.boolean().required()
})
export default {
    contactsAddSchema,
    contactUpdateFavSchema,
}