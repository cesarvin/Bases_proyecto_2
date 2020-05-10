const { Pool } = require('pg');

const config = {
  user:'postgres',
  host:'localhost',
  password: '',
  database: 'Spotifake'
};

 pool = new Pool(config); 

const getArtist = async () => {
  try{
    const res = await pool.query('SELECT * FROM ARTIST limit 5');
    console.log(res.rows);
  }catch(e){
    console.log(e);
  }
}

getArtist();