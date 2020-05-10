//consulta todos los roles 
const getRol = async (req, res) => {
  try{
    const response = await pool.query('SELECT * FROM Rol');
    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una Rol, y retorna la tupla creada.
const setRol = async (req, res) => {
  try{

    const { rolId, name } = req.body; 
    
    //si existe el id actualiza sino inserta
    if (rolId){
      const update = await pool.query('UPDATE Rol SET Name = $2 WHERE RolId = $1', [ rolId, name ] );
      res.send('ok');
    }else {
      const insert = await pool.query('INSERT INTO Rol (Name) VALUES ($1)', [name] );
      const response = await pool.query('SELECT * FROM Rol WHERE name = $1', [name]);
      res.json(response.rows);
    }
  }catch(e){
    console.log(e);
  }

}

//se elimina el Rol
const delRol = async (req, res) => {
  try{
    const id = req.params.id; 
    const response = await pool.query('DELETE FROM Rol WHERE RolId = $1', [id]);
    res.send('Se elimino correctamente');
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getRol,
  setRol,
  //updRol,
  delRol
}