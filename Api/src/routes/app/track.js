const { Router } = require('express'); 
const router = Router(); 

const { delTrack, setTrack} = require('../../controllers/app/track');

//consulta
// router.get('/album', getAlbum);
// router.get('/album/:name', getAlbum);
// router.get('/albumbyid/:id', getAlbumById);
// router.get('/albumtracks/:id', getAlbumTracks);
// router.get('/artist/album/:artistId', getAlbumByArtist);
// router.get('/artist/album/:artistId/:name', getAlbumByArtist);

//ingresa
router.post('/track', setTrack);

//elimina
router.delete('/track/:id', delTrack);

//exporta las rutas
module.exports = router; 