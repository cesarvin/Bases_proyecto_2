const { Router } = require('express'); 
const router = Router(); 

const { getOption, setOption, updOption, delOption } = require('../../controllers/seguridad/option');
//consulta
router.get('/option', getOption);
//ingresa
router.post('/option', setOption);
//actualiza
router.put('/option', updOption);
//elimina
router.delete('/option', delOption);

//exporta las rutas
module.exports = router; 