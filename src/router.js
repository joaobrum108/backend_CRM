const express = require('express');
const router = express.Router(); 

const controllerUsers = require('./Controllers/controllerUsers'); 

router.post('/register', controllerUsers.RegisterUser);

module.exports = router;
