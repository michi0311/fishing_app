var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const passport = require('./config/passport');

router.post('/',userController.create)

router.get('/:id',passport.authenticate('jwt', { session: false }),userController.getByID);
router.get('/', passport.authenticate('jwt', { session: false }),userController.getAllUsers);

router.patch('/:id',passport.authenticate('jwt', { session: false }),userController.updateUser);

router.delete('/:id',passport.authenticate('jwt', { session: false }),userController.deleteUser);



router.use('*', (req,res) => {
  res.status(400).send("Wrong URL")
})
module.exports = router;
