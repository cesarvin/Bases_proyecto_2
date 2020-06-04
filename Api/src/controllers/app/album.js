//consulta albums
const getAlbum = async (req, res) => {
  try{
    
    const name = req.params.name;

    if (name){
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) WHERE UPPER(Title) like \'%' + name.toUpperCase() + '%\' OR UPPER(ar.name) like \'%' + name.toUpperCase() + '%\'  ORDER BY ar.name, Title' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) ORDER BY ar.name, Title ' );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}


const getAlbumById = async (req, res) => {
  try{
    
    const id = req.params.id; 
    if (id){
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) WHERE al.AlbumId = $1  ORDER BY al.albumid, al.Title',[id]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getAlbumTracks = async (req, res) => {
  try{
    
    const id = req.params.id; 
    const accountid = req.params.accountid;
    if (id){
      // const response = await pool.query('SELECT ar.name AS artist, a.title AS title,t.trackid, t.name, g.name AS genre, t.composer, t.milliseconds AS duration  \
      //                                     FROM album a   \
      //                                       INNER JOIN artist ar ON (a.artistid = ar.artistid )  \
      //                                       INNER JOIN track t ON (a.albumid  = t.albumid)  \
      //                                       INNER JOIN genre g ON (t.genreid = g.genreid )  \
      //                                     WHERE a.albumid =$1  \
      //                                     ORDER BY trackid',[id]);
      const response = await pool.query('SELECT tba.*, CASE WHEN bt.trackid IS NOT NULL OR i.trackid IS NOT NULL THEN 1 ELSE 0 END AS play, CASE WHEN sc.trackid IS NOT NULL THEN 1 ELSE 0 END AS cart  \
                                          FROM TrackByAlbum tba \
                                            LEFT OUTER JOIN BuyedTracks bt ON (tba.trackid = bt.trackid AND bt.accountid = $2) \
                                            LEFT OUTER JOIN ShopCart sc ON (tba.trackid = sc.trackid AND sc.accountid = $2) \
                                            LEFT OUTER JOIN TrackByUserInsert i ON (tba.trackid = i.trackid AND i.insaccountid = $2) \
                                          WHERE tba.albumid =$1 \
                                          ORDER BY tba.trackid ASC ',[id, accountid]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getAlbumsByArtistId = async (req, res) => {
  try{
    
    const id = req.params.id; 
    if (id){
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) WHERE al.ArtistId = $1  ORDER BY al.albumid, al.Title',[id]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getAlbumByArtist = async (req, res) => {
  try{
    
    const artistId = req.params.artistId;
    const name = req.params.name;

    if (name){
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) WHERE al.ArtistId =' + artistId + ' AND UPPER(title) like \'%' + name.toUpperCase() + '%\'' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT al.*, ar.name as artistname FROM Album al INNER JOIN Artist ar ON (ar.artistid = al.artistid) WHERE al.ArtistId =' + artistId );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}

//agrega una Album o actualiza si existe, y retorna la tupla cuando agrega.
const setAlbum = async (req, res) => {
  try{
    const { albumid, name, artistid, accountid } = req.body; 

    if (albumid){
      const update = await pool.query('UPDATE Album SET Title = $2, updAccountId = $3 WHERE AlbumId = $1', [ albumid, name, accountid ] );
      res.json('ok');
    }else {
      const insert = await pool.query('INSERT INTO Album (Title, artistId, insAccountId) VALUES ($1, $2, $3)', [name ,artistid, accountid] );
      res.json('ok');
    }
  }catch(e){
    console.log(e);
  }

}

//se elimina el Album
const delAlbum = async (req, res) => {
  try{
    const id = req.params.id; 
    const track = await pool.query('SELECT 1 FROM Track WHERE AlbumId = $1 ORDER BY albumid, name', [id]);
    
    if (track.rowCount != 0 && track.rows[0].login == 1) {
      throw 'No se puede eliminar, tiene albums asociados'
    }

    const response = await pool.query('DELETE FROM Album WHERE AlbumId = $1', [id]);
    res.json('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
}


//agrega una canción al historial de reproducciones
const playSong = async (req, res) => {
  try{
    const { trackid, accountid } = req.body; 
    const insert = await pool.query('INSERT INTO TrackPlayed (AccountId, TrackId) VALUES ($1, $2)', [accountid, trackid] );
    res.json('ok');
    
  }catch(e){
    console.log(e);
  }

}

//agregar al carrito
const addCart = async (req, res) => {
  try{
    const { trackid, accountid } = req.body; 
    const insert = await pool.query('INSERT INTO ShopCart (AccountId, TrackId) VALUES ($1, $2)', [accountid, trackid] );
    res.json('ok');
    
  }catch(e){
    console.log(e);
  }

}


const getCart = async (req, res) => {
  try{
    
    const accountid = req.params.accountid; 
    if (accountid){
      const response = await pool.query(' SELECT artist, title, name, duration, unitprice  \
                                         FROM ShopCart sc INNER JOIN TrackByAlbum tba ON (sc.trackid = tba.trackid)  \
                                         WHERE accountid = $1',[accountid]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const soldcart = async (req, res) => {
  try{
    
    const accountid = req.params.accountid; 
    if (accountid){
      const response = await pool.query(' SELECT Sold( $1)',[accountid]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getMyTracks = async (req, res) => {
  try{
    
    const accountid = req.params.accountid;
    if (accountid){
      const response = await pool.query('SELECT tba.* \
                                          FROM mytracks mt \
                                            INNER JOIN TrackByAlbum tba ON (mt.trackid = tba.trackid) \
                                          WHERE accountid = $1',[accountid]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getMyTrack = async (req, res) => {
  try{
    
    const { track, accountid } = req.body; 

    if (accountid){
      const response = await pool.query('SELECT tba.* \
                                          FROM mytracks mt \
                                            INNER JOIN TrackByAlbum tba ON (mt.trackid = tba.trackid) \
                                          WHERE accountid =' + accountid+ ' AND upper(tba.name) like \'%'+ track.toUpperCase() + '%\'');
      res.json(response.rows);
    }

    
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getAlbum,
  getAlbumByArtist,
  getAlbumById,
  getAlbumTracks,
  setAlbum,
  delAlbum,
  playSong,
  addCart,
  getCart,
  soldcart,
  getMyTracks,
  getMyTrack
}