const { Router } = require('express'); 
const router = Router(); 

const { getRol, setRol, delRol } = require('../../controllers/seguridad/rol');
//const { getRol, setRol, updRol, delRol } = require('../../controllers/seguridad/rol');
//consulta
router.get('/rol', getRol);
//ingresa
router.post('/rol', setRol);
//actualiza
//router.put('/rol', updRol);
//elimina
router.delete('/rol/:id', delRol);

//exporta las rutas
module.exports = router; 