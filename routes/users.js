var express = require('express');
var router = express.Router();
var user = require('../controllers/User');
const tokenMiddleware = require("../middlewares/tokens.middleware");


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', user.Register);
router.post('/login', user.Login);
router.delete('/delete', tokenMiddleware.verifyToken, user.Delete);
router.post('/update', tokenMiddleware.verifyToken, user.Update);

module.exports = router;
