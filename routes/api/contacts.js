import contactsController from "../../controllers/contact-controller.js";
import express from "express"
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { validateBody, isValidId, authenticate, upload } from "../../middlewars/index.js";


const router = express.Router()
router.use(authenticate);

router.get('/', contactsController.getAll)

router.get('/:contactId', isValidId, contactsController.getById)

router.post('/', upload.single("poster"), contactsController.add)

router.delete('/:contactId', isValidId, contactsController.deleteById)

router.put('/:contactId', isValidId, validateBody(contactsSchemas.contactsAddSchema), contactsController.update);

router.patch('/:contactId/favorite', isValidId, validateBody(contactsSchemas.contactUpdateFavSchema), contactsController.updateFav);


export default router;
