const { Router } = require('express'); 
const router = Router(); 

const { getRolOption, setRolOption, delRolOption } = require('../../controllers/seguridad/rolOption');
//const { getRolOption, setRolOption, updRolOption, delRolOption } = require('../../controllers/seguridad/roloption');
//consulta
router.get('/roloption/:id', getRolOption);
//ingresa
router.post('/roloption', setRolOption);
//actualiza
//router.put('/rol', updRolOption);
//elimina
router.delete('/roloption/:rolId/:optionId', delRolOption);

//exporta las rutas
module.exports = router; 