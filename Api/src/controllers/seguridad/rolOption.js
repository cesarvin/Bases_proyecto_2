//Consulta las opciones de un rol
const getRolOption= async (req, res) => {
  try{
    
    const id = req.params.id; 
    
    const response = await pool.query('SELECT RO.rolId, RO.optionId, R.name AS Rol, O.name AS Option \
                                      FROM roloption RO \
                                          INNER JOIN rol R ON (RO.rolId = R.rolId) \
                                          INNER JOIN Option O ON (RO.optionId = O.optionId) \
                                      WHERE RO.rolId = $1', [id]);

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una Rol, y retorna la tupla creada.
const setRolOption = async (req, res) => {
  try{

    const { rolId, optionId } = req.body; 
    
    //inserta
    const insert = await pool.query('INSERT INTO RolOption (rolId, optionId) VALUES ($1, $2)', [rolId, optionId] );
    
    //retorna ultimo valor insertado
    const response = await pool.query('SELECT RO.rolId, RO.optionId, R.name AS Rol, O.name AS Option \
                                      FROM roloption RO \
                                          INNER JOIN rol R ON (RO.rolId = R.rolId) \
                                          INNER JOIN Option O ON (RO.optionId = O.optionId) \
                                      WHERE RO.rolId = $1 AND RO.OptionId = $2', [ rolId, optionId]);
    res.json(response.rows);
    
  }catch(e){
    console.log(e);
  }

}

//se elimina el Rol
const delRolOption = async (req, res) => {
  try{
    
    const rolId = req.params.rolId;
    const optionId = req.params.optionId; 
    const response = await pool.query('DELETE FROM roloption RO WHERE RO.rolId = $1 AND RO.OptionId = $2', [ rolId, optionId]);
    res.send('Se elimino correctamente');

  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getRolOption,
  setRolOption,
  delRolOption
}