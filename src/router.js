const express = require('express');
const router = express.Router(); 
const controllerUsuarios = require ('./controllers/controllerUsuarios');



router.post('/cadastro' , controllerUsuarios.addUsuario);
router.get('/buscar-usuario' , controllerUsuarios.listUsuarios);
router.get('/usuario' , controllerUsuarios.getUsuario);
router.post(`/updateUsuario`, controllerUsuarios.updateUsuario);


module.exports = router;
