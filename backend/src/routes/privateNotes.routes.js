const express = require('express');
const router = express.Router();
const privateNotesController = require('../controllers/privateNotesController');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', privateNotesController.getPrivateNotes);
router.post('/', privateNotesController.createPrivateNote);
router.post('/:id/unlock', privateNotesController.unlockPrivateNote);
router.put('/:id', privateNotesController.updatePrivateNote);
router.delete('/:id', privateNotesController.deletePrivateNote);

module.exports = router;
