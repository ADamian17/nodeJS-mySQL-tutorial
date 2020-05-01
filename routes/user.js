const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.user.index);
router.get('/:id', ctrl.user.findUsers);
router.post('/newuser', ctrl.user.createUsers);
router.put('/update/:id', ctrl.user.updateUsers);
router.delete('/delete/:id', ctrl.user.deleteUsers);

module.exports = router;
