import contactsController from "../../controllers/contact-controller.js";
import express from "express"



const router = express.Router()

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getById)

router.post('/', contactsController.add)

router.delete('/:contactId', contactsController.deleteById)

router.put('/:contactId', contactsController.update)

export default router;
