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
    if (id){
      const response = await pool.query('SELECT ar.name AS artist, a.title AS title,t.trackid, t.name, g.name AS genre, t.composer, t.milliseconds AS duration  \
                                          FROM album a   \
                                            INNER JOIN artist ar ON (a.artistid = ar.artistid )  \
                                            INNER JOIN track t ON (a.albumid  = t.albumid)  \
                                            INNER JOIN genre g ON (t.genreid = g.genreid )  \
                                          WHERE a.albumid =$1  \
                                          ORDER BY trackid',[id]);
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
    const { albumid, name, artistid } = req.body; 

    if (albumid){
      const update = await pool.query('UPDATE Album SET Title = $2 WHERE AlbumId = $1', [ albumid, name ] );
      res.json('ok');
    }else {
      const insert = await pool.query('INSERT INTO Album (Title, artistId) VALUES ($1, $2)', [name ,artistid] );
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

module.exports = {
  getAlbum,
  getAlbumByArtist,
  getAlbumById,
  getAlbumTracks,
  setAlbum,
  delAlbum
}