import express from "express"
import ContactsServices from "../../models/contacts.js"
import { HttpError } from "../../helpers/index.js"
import Joi from "joi"


const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {

    const result = await ContactsServices.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactsServices.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await ContactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactsServices.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json({
      message: "Deleted successfully"
    })

  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const result = await ContactsServices.updateContactById(contactId, req.body)
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);

  }
  catch (error) {
    next(error)
  }
})

export default router;
