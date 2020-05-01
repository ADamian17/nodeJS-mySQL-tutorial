const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.user.index);
router.get('/:id', ctrl.user.findUsers);
router.post('/newuser', ctrl.user.createUsers);
router.put('/updateuser', ctrl.user.updateUsers);
router.delete('/deleteusers', ctrl.user.deleteUsers);

module.exports = router;
