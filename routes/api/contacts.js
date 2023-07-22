import contactsController from "../../controllers/contact-controller.js";
import express from "express"
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";


const router = express.Router()

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getById)

router.post('/', validateBody(contactsSchemas.contactsAddSchema), contactsController.add)

router.delete('/:contactId', contactsController.deleteById)

router.put('/:contactId', validateBody(contactsSchemas.contactsAddSchema), contactsController.update)

export default router;
