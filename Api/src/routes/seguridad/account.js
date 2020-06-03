const { Router } = require('express'); 
const router = Router(); 

const { getLogin, getSingin, getAcccounts, getReport, ventas_por_semana,canciones_mas_reproducidas, ventas_por_genero, ventas_por_artista} = require('../../controllers/seguridad/account');

//consulta
router.post('/login', getLogin);

//consulta
router.post('/singin', getSingin);

//consulta
router.get('/account', getAcccounts);


router.get('/report/:id', getReport);


router.post('/vps', ventas_por_semana);

router.post('/cmr', canciones_mas_reproducidas);

router.post('/vpg', ventas_por_genero);

router.post('/vpa', ventas_por_artista);

//exporta las rutas
module.exports = router; 