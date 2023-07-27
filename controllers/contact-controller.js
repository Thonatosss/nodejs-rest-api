// import ContactsServices from "../models/contacts.js"

import Contact from "../models/contact.js"
import { ctrlWrapper } from "../decorators/index.js"


const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
}

const getById = async (req, res) => {
        const { contactId } = req.params;
    const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json(result);    
}

const add = async (req, res) => {

    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const deleteById = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json({
            message: "Deleted successfully"
        })
}

const update = async (req, res) => {

        const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Contact not found");
        }
        res.json(result);
}
const updateFav = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
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
    updateFav: ctrlWrapper(updateFav),
}