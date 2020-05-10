//consulta todos Option
const getOption = async (req, res) => {
  try{
    const response = await pool.query('SELECT * FROM Option');
    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una Option, y retorna la tupla creada.
const setOption = async (req, res) => {
  try{
    const { name } = req.body; 

    const insert = await pool.query('INSERT INTO Option (Name) VALUES ($1)', [name] );
    const response = await pool.query('SELECT * FROM Option WHERE name = $1', [name]);
    
    res.json(response.rows);
  
  }catch(e){
    console.log(e);
  }

}

//actualiza Option
const updOption = async (req, res) => {
  try{
    const { OptionId, name } = req.body; 

    const update = await pool.query('UPDATE Option SET Name = $2 WHERE OptionId = $1', [ OptionId, name ] );
    res.send('ok');
  
  }catch(e){
    console.log(e);
  }
}

//se elimina el Option
const delOption = async (req, res) => {
  try{
    const id = req.params.id; 
    const response = await pool.query('DELETE FROM Option WHERE OptionId = $1', [id]);
    res.send('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getOption,
  setOption,
  updOption,
  delOption
}