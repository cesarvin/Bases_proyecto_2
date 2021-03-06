const { Router } = require('express'); 
const router = Router(); 

const { getAlbum, setAlbum, delAlbum , getAlbumByArtist, getAlbumById, getAlbumTracks, playSong, addCart, getCart, soldcart,getMyTracks,getMyTrack} = require('../../controllers/app/album');

//consulta
router.get('/album', getAlbum);
router.get('/album/:name', getAlbum);
router.get('/albumbyid/:id', getAlbumById);
router.get('/albumtracks/:id/:accountid', getAlbumTracks);
router.get('/artist/album/:artistId', getAlbumByArtist);
router.get('/artist/album/:artistId/:name', getAlbumByArtist);
router.post('/play', playSong);
router.post('/addcart', addCart);
router.get('/shopcart/:accountid', getCart);
router.get('/sold/:accountid', soldcart);
router.get('/mytracks/:accountid',getMyTracks);
router.post('/mytrack', getMyTrack);

//ingresa
router.post('/album', setAlbum);

//elimina
router.delete('/album/:id', delAlbum);

//exporta las rutas
module.exports = router; 