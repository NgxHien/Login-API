var express = require('express');
var router = express.Router();
var user = require('../controllers/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', user.Register);
router.post('/login', user.Login);

module.exports = router;
