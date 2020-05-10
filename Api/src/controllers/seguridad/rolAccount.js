//Consulta los roles de una cuenta
const getRolAccount= async (req, res) => {
  try{
    
    const id = req.params.id; 
    
    const response = await pool.query('SELECT RA.accountId, RA.rolId, R.name AS Rol \
                                      FROM rolaccount RA \
                                          INNER JOIN rol R ON (RA.rolId = R.rolId) \
                                          INNER JOIN Account A ON (RA.accountId = A.accountId) \
                                      WHERE RA.accountId = $1', [id]);

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una Rol, y retorna la tupla creada.
const setRolAccount = async (req, res) => {
  try{

    const { rolid, accountid } = req.body; 
    
    //inserta
    const insert = await pool.query('INSERT INTO RolAccount (rolId, accountId) VALUES ($1, $2)', [rolid, accountid] );
    
    res.json('ok');
    
  }catch(e){
    console.log(e);
    res.json('ya existe');
  }

}

//se elimina el Rol
const delRolAccount = async (req, res) => {
  try{
    
    const rolId = req.params.rolId;
    const accountId = req.params.accountId; 
    const response = await pool.query('DELETE FROM rolaccount WHERE rolId = $1 AND AccountId = $2', [ rolId, accountId]);
    res.send('Se elimino correctamente');

  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getRolAccount,
  setRolAccount,
  delRolAccount
}