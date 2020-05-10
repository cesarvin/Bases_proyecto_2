const { Router } = require('express'); 
const router = Router(); 

const { getRolAccount, setRolAccount, delRolAccount } = require('../../controllers/seguridad/rolAccount');
//const { getRolAccount, setRolAccount, updRolAccount, delRolAccount } = require('../../controllers/seguridad/rolaccount');
//consulta los roles de una cuenta
router.get('/rolaccount/:id', getRolAccount);
//ingresa
router.post('/rolaccount', setRolAccount);
//actualiza
//router.put('/rol', updRolAccount);
//elimina
router.delete('/rolaccount/:rolId/:accountId', delRolAccount);

//exporta las rutas
module.exports = router; 