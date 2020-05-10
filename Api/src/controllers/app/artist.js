//consulta artistas
const getArtist = async (req, res) => {
  try{
    
    const name = req.params.name; 
    if (name){
      const response = await pool.query('SELECT * FROM Artist WHERE UPPER(Name) like \'%' + name.toUpperCase() + '%\'  ORDER BY artistid, name ' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT * FROM Artist  ORDER BY artistid, name' );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}

const getArtistById = async (req, res) => {
  try{
    
    const id = req.params.id; 
    if (id){
      const response = await pool.query('SELECT * FROM Artist WHERE ArtistId = $1  ORDER BY artistid, name',[id]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

const getArtistByAlbumId = async (req, res) => {
  try{
    
    const id = req.params.id; 
    if (id){
      const response = await pool.query('SELECT ar.* FROM album a INNER JOIN artist ar ON (a.artistid = ar.artistid ) WHERE a.albumid = $1',[id]);
      res.json(response.rows);
    }

  }catch(e){
    console.log(e);
  }
}

//agrega una Artist o actualiza si existe, y retorna la tupla cuando agrega.
const setArtist = async (req, res) => {
  try{
    const { artistid, name } = req.body; 

    if (artistid){
      const update = await pool.query('UPDATE Artist SET Name = $2 WHERE ArtistId = $1', [ artistid, name ] );
      res.json('ok');
    }else {
      const insert = await pool.query('INSERT INTO Artist (Name) VALUES ($1)', [name] );
      const response = await pool.query('SELECT * FROM Artist WHERE name = $1 ORDER BY artistid, name', [name]);
    
      res.json(response.rows);
    }
  }catch(e){
    console.log(e);
  }

}

//se elimina el Artist
const delArtist = async (req, res) => {
  try{
    const id = req.params.id; 
    const album = await pool.query('SELECT 1 FROM Album WHERE ArtistId = $1', [id]);
    
    if (album.rowCount != 0 && album.rows[0].login == 1) {
      throw 'No se puede eliminar, tiene albums asociados'
    }

    const response = await pool.query('DELETE FROM Artist WHERE ArtistId = $1', [id]);
    res.json('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getArtist,
  getArtistById,
  getArtistByAlbumId,
  setArtist,
  delArtist
}