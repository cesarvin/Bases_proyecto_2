//consulta todos los tipos de acción que puede realizar un usuario a la DB
const getActionType = async (req, res) => {
  try{
    const response = await pool.query('SELECT * FROM ActionType');
    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una ActionType, y retorna la tupla creada.
const setActionType = async (req, res) => {
  try{
    const { name } = req.body; 

    const insert = await pool.query('INSERT INTO ActionType (Name) VALUES ($1)', [name] );
    const response = await pool.query('SELECT * FROM ActionType WHERE name = $1', [name]);
    
    res.json(response.rows);
  
  }catch(e){
    console.log(e);
  }

}

//actualiza ActionType
const updActionType = async (req, res) => {
  try{
    const { actionTypeId, name } = req.body; 

    const update = await pool.query('UPDATE ActionType SET Name = $2 WHERE ActionTypeId = $1', [ actionTypeId, name ] );
    res.send('ok');
  
  }catch(e){
    console.log(e);
  }
}

//se elimina el ActionType
const delActionType = async (req, res) => {
  try{
    const id = req.params.id; 
    const response = await pool.query('DELETE FROM ActionType WHERE ActionTypeId = $1', [id]);
    res.send('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getActionType,
  setActionType,
  updActionType,
  delActionType
}