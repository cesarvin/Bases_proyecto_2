const { Router } = require('express'); 
const router = Router(); 

const { getAction, setAction, delAction, getActionByRol } = require('../../controllers/seguridad/action');

//consulta
router.get('/action', getAction);

router.get('/actionbyrolid/:rolid', getActionByRol);

//ingresa
router.post('/action', setAction);

//elimina
router.delete('/action/:optionId/:actionId/:rolId', delAction);

//exporta las rutas
module.exports = router; 