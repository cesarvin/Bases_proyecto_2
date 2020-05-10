
//agrega una Track o actualiza si existe, y retorna la tupla cuando agrega.
const setTrack = async (req, res) => {
  try{
    const {name, composer, milliseconds, unitprice, mediatype, albumid, genreid} = req.body; 

    
    const insert = await pool.query('INSERT INTO Track (name, composer , milliseconds , unitprice , mediatypeid , albumid, genreid) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, composer, milliseconds, unitprice, mediatype, albumid, genreid] );
    
    res.json('OK');
    
  }catch(e){
    console.log(e);
  }

}

//se elimina el Track
const delTrack = async (req, res) => {
  try{
    const id = req.params.id; 

    const deletePlayListTrack = await pool.query('DELETE FROM playlisttrack WHERE trackid = $1', [id])

    const track = await pool.query('DELETE FROM track WHERE trackid = $1', [id])
    
    res.json('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  // getTrack,
  // getTrackByArtist,
  // getTrackById,
  // setTrack,
  setTrack,
  delTrack
}