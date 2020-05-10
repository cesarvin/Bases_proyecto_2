//Consulta las acciones
const getAction= async (req, res) => {
  try{
    
    const response = await pool.query('SELECT r2.*,  O.name AS option, r.name AS rol, A.name AS accion  \
                                        FROM roloption r2  \
                                          INNER JOIN rol r ON R2.rolid = r.rolid   \
                                          INNER JOIN option O ON r2.optionid = o.optionid  \
                                          INNER JOIN action A ON r2.actionid = A.actionid  \
                                        ORDER BY O.name, r.rolid, a.actionid');

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

const getActionByRol= async (req, res) => {
  try{
    
    const rolid = req.params.rolid;

    const response = await pool.query('SELECT r2.*,  O.name AS option, r.name AS rol, A.name AS accion  \
                                        FROM roloption r2  \
                                          INNER JOIN rol r ON R2.rolid = r.rolid   \
                                          INNER JOIN option O ON r2.optionid = o.optionid  \
                                          INNER JOIN action A ON r2.actionid = A.actionid  \
                                        WHERE r2.rolid = $1   \
                                        ORDER BY O.name, r.rolid, a.actionid', [rolid]);

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una accion a una opción
const setAction = async (req, res) => {
  try{

    const { actionid, optionid, rolid } = req.body; 
    
    //inserta
    const insert = await pool.query('INSERT INTO roloption (actionId, optionId, rolId) VALUES ($1, $2, $3)', [actionid, optionid, rolid] );
    
    res.json('rolid');
    
  }catch(e){
    console.log(e);
    
    res.json('ya existe ->' + e);
  }

}

//se elimina la acción de una opción
const delAction = async (req, res) => {
  try{
    const optionId = req.params.optionId;
    const actionId = req.params.actionId;
    const rolId = req.params.rolId;
     
    const response = await pool.query('DELETE FROM roloption A WHERE A.OptionId = $1 AND A.ActionId = $2 AND A.rolId = $3', [ optionId, actionId, rolId]);
    res.send('Se elimino correctamente');

  }catch(e){
    console.log(e);
    res.send('Error al eliminar');
  }
}

module.exports = {
  getAction,
  setAction,
  delAction,
  getActionByRol
}