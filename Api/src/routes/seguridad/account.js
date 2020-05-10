const { Router } = require('express'); 
const router = Router(); 

const { getLogin, getSingin, getAcccounts, getReport} = require('../../controllers/seguridad/account');

//consulta
router.post('/login', getLogin);

//consulta
router.post('/singin', getSingin);

//consulta
router.get('/account', getAcccounts);


router.get('/report/:id', getReport);

//exporta las rutas
module.exports = router; 