import ContactsServices from "../models/contacts.js"
import { HttpError } from "../helpers/index.js"

import { ctrlWrapper } from "../decorators/index.js"


const getAll = async (req, res) => {
    const result = await ContactsServices.listContacts();
    res.json(result);
}

const getById = async (req, res) => {
        const { contactId } = req.params;
        const result = await ContactsServices.getContactById(contactId);
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json(result);    
}

const add = async (req, res) => {
        
        const result = await ContactsServices.addContact(req.body);
        res.status(201).json(result);    
}

const deleteById = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await ContactsServices.removeContact(contactId);
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json({
            message: "Deleted successfully"
        })
}

const update = async (req, res) => {
        
        const { contactId } = req.params;
        const result = await ContactsServices.updateContactById(contactId, req.body)
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json(result);
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    update: ctrlWrapper(update),
}