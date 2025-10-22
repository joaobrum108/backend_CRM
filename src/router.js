const express = require('express');
const router = express.Router(); 

const controllerUsers = require('./Controllers/controllerUsers'); 

// crud usuarios basicao completo
// concluido na quarta feira 
router.post('/register', controllerUsers.RegisterUser);
router.get('/listUsers' , controllerUsers.listUsuario);
router.get('/users/:id' , controllerUsers.listUserId);
router.put('/users/:id', controllerUsers.updateUser);
router.delete('/delete/:id' , controllerUsers.deleteUser)


module.exports = router;
