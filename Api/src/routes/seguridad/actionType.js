const { Router } = require('express'); 
const router = Router(); 

const { getActionType, setActionType, updActionType, delActionType } = require('../../controllers/seguridad/actionType');
//consulta
router.get('/actiontype', getActionType);
//ingresa
router.post('/actiontype', setActionType);
//actualiza
router.put('/actiontype', updActionType);
//elimina
router.delete('/actiontype/:id', delActionType);

//exporta las rutas
module.exports = router; 