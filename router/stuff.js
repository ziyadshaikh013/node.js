const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controller/stuff');

router.post('/', multer, stuffCtrl.createThing);
router.get('/', stuffCtrl.getAllThings);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.updateThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;