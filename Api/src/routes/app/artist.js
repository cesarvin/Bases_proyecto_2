const { Router } = require('express'); 
const router = Router(); 

const { getArtist, setArtist, delArtist, getArtistById, getArtistByAlbumId } = require('../../controllers/app/artist');

//consulta
router.get('/artist', getArtist);
router.get('/artist/:name', getArtist);
router.get('/artistbyid/:id', getArtistById);
router.get('/artistbyalbumid/:id', getArtistByAlbumId);


//ingresa
router.post('/artist', setArtist);

//elimina
router.delete('/artist/:id', delArtist);

//exporta las rutas
module.exports = router; 