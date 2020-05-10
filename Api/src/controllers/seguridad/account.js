//realiza el login
const getLogin = async (req, res) => {
  try{
    
    const user = req.body.user;
    const pass = req.body.pass; 
    var menu = {};
     
    const login = await pool.query('SELECT 1 AS Login,  accountid AS accountid \
                                       FROM account a \
                                       WHERE a.accountuser = $1 \
                                       AND a.password  =$2 \
                                       LIMIT 1', [user, pass]);
    //console.log(login);
    if (login.rowCount != 0 && login.rows[0].login == 1){
      menu.login = 1;
      var accountid =  login.rows[0].accountid
      const getMenu = await pool.query('SELECT  O.*,   \
                                              (CASE WHEN EXISTS (   \
                                                SELECT ra.rolid, ro.optionid, ac.name    \
                                                FROM account a    \
                                                    INNER JOIN rolaccount ra ON (A.accountid = RA.accountid )   \
                                                    INNER JOIN roloption ro ON (ra.rolid = ro.rolid )   \
                                                    INNER JOIN action ac ON (ro.actionid = ac.actionid )   \
                                                WHERE A.accountid = $1   \
                                                AND ro.optionid = o.optionid    \
                                                AND ac.name = \'Seleccionar\'   \
                                              ) THEN 1 ELSE 0 END) AS seleccionar,   \
                                              (CASE WHEN EXISTS (   \
                                                SELECT ra.rolid, ro.optionid, ac.name    \
                                                FROM account a    \
                                                    INNER JOIN rolaccount ra ON (A.accountid = RA.accountid )   \
                                                    INNER JOIN roloption ro ON (ra.rolid = ro.rolid )   \
                                                    INNER JOIN action ac ON (ro.actionid = ac.actionid )   \
                                                WHERE A.accountid = $1   \
                                                AND ro.optionid = o.optionid     \
                                                AND ac.name = \'Insertar\'   \
                                              ) THEN 1 ELSE 0 END) AS insertar,   \
                                              (CASE WHEN EXISTS (   \
                                                SELECT ra.rolid, ro.optionid, ac.name    \
                                                FROM account a    \
                                                    INNER JOIN rolaccount ra ON (A.accountid = RA.accountid )   \
                                                    INNER JOIN roloption ro ON (ra.rolid = ro.rolid )   \
                                                    INNER JOIN action ac ON (ro.actionid = ac.actionid )   \
                                                WHERE A.accountid = $1   \
                                                AND ro.optionid = o.optionid    \
                                                AND ac.name = \'Actualizar\'   \
                                              ) THEN 1 ELSE 0 END) AS actualizar,   \
                                              (CASE WHEN EXISTS (   \
                                                SELECT ra.rolid, ro.optionid, ac.name    \
                                                FROM account a    \
                                                    INNER JOIN rolaccount ra ON (A.accountid = RA.accountid )   \
                                                    INNER JOIN roloption ro ON (ra.rolid = ro.rolid )   \
                                                    INNER JOIN action ac ON (ro.actionid = ac.actionid )   \
                                                WHERE A.accountid = $1   \
                                                AND ro.optionid = o.optionid     \
                                                AND ac.name = \'Eliminar\'   \
                                              ) THEN 1 ELSE 0 END) AS eliminar,   \
                                              (CASE WHEN EXISTS (   \
                                                SELECT ra.rolid, ro.optionid, ac.name    \
                                                FROM account a    \
                                                    INNER JOIN rolaccount ra ON (A.accountid = RA.accountid )   \
                                                    INNER JOIN roloption ro ON (ra.rolid = ro.rolid )   \
                                                    INNER JOIN action ac ON (ro.actionid = ac.actionid )   \
                                                WHERE A.accountid = $1   \
                                                AND ro.optionid = o.optionid     \
                                                AND ac.name = \'Inactivar\'   \
                                              ) THEN 1 ELSE 0 END) AS inactivar   \
                                            FROM option o ', [accountid]);
      
      menu.menu = getMenu.rows;
    } else {
      throw 'Usuario o contraseña incorrectos'
    }

    res.json(menu);

  }catch(e){
    console.log(e);
    res.status(400).json({login: 0});
  }
}

const getSingin = async (req, res) => {
  try{
    
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.username;
    const pass = req.body.password; 
    var accountid; 

    const account = await pool.query ('INSERT INTO account (accountuser, password, isactive) VALUES ($1, $2, 1)', [email,pass])

    const getaccountid = await pool.query('SELECT accountid AS accountid \
                                       FROM account a \
                                       WHERE a.accountuser = $1 \
                                       AND a.password  =$2', [email, pass]);
    
                
   
    if (getaccountid.rowCount != 0 ){
      accountid = getaccountid.rows[0].accountid;
    }else {
      throw 'error al crear cuenta'
    }

    const customer = await pool.query ('INSERT INTO customer (firstname, lastname, email, accountid) VALUES ($1, $2, $3, $4)', [firstname, lastname, email,accountid])

    const rolaccount = await pool.query ('INSERT INTO rolaccount (accountid, rolid) VALUES ($1, 2)', [accountid]);
    

    res.json('registrado');

  }catch(e){
    console.log(e);
    res.status(400).json({login: 0});
  }
}

//Consulta las acciones
const getAcccounts= async (req, res) => {
  try{
    
    const response = await pool.query('SELECT a.accountid, COALESCE (e.firstname, c.firstname) firstname, COALESCE (e.lastname , c.lastname ) lastname,   \
                                        CASE WHEN e.employeeid IS NOT NULL THEN 1 ELSE 0 END isemployee, a.accountuser    \
                                        FROM account a   \
                                        LEFT OUTER JOIN employee e ON a.accountid = e.accountid    \
                                        LEFT OUTER JOIN customer c ON a.accountid = c.accountid');

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

const getReport = async (req, res) => {
  try{
    
    const id = req.params.id; 
    if (id==1){
      const response = await pool.query('SELECT Name, count(Name) AS conteo \
                                        FROM Artist NATURAL JOIN Album \
                                        GROUP BY ArtistId \
                                        ORDER BY count (ArtistId) DESC \
                                        LIMIT 5 ');

      res.json(response.rows);
    }
    if (id==2){
      const response = await pool.query('SELECT Lista.genreid, Genre.name, Lista.Cuenta \
      FROM( \
        Select genreid,  count(trackid) As Cuenta \
        from track \
        group by genreid \
        ORDER by genreid \
      ) as Lista \
        inner join Genre on Genre.genreid =Lista.genreid \
      ORDER BY Cuenta DESC \
      LIMIT 5 ');

      res.json(response.rows);
    }
    if (id==3){
      const response = await pool.query('SELECT PL.playlistid, playlist.name, PL.Tiempo \
      FROM (SELECT Playlisttrack.playlistid, SUM(Track.milliseconds) AS Tiempo \
          FROM Playlisttrack \
          INNER JOIN Track ON Playlisttrack.trackid = Track.trackid \
          GROUP BY Playlisttrack.playlistid \
          ORDER BY Playlisttrack.playlistid \
         ) AS PL INNER JOIN Playlist ON PL.playlistid = Playlist.playlistid; ');

      res.json(response.rows);
    }
    if (id==4){
      const response = await pool.query('SELECT a.Name, t.Milliseconds \
                                                FROM (Track t NATURAL JOIN Album al) NATURAL JOIN Artist a \
                                                ORDER BY t.Milliseconds DESC \
                                                LIMIT 5');

      res.json(response.rows);
    }
    if (id==5){
      const response = await pool.query(' SELECT ListaA.artistid, Artist.name, ListaA.cuenta \
      FROM ( \
        SELECT artistid, count(trackid) AS Cuenta \
        FROM track INNER JOIN album  ON Album.albumid = Track.albumid  \
        GROUP BY artistid \
      ) AS ListaA \
        INNER JOIN  artist ON artist.artistid = ListaA.artistid \
      ORDER BY ListaA.Cuenta DESC \
      LIMIT 5  ');

      res.json(response.rows);
    }
    if (id==6){
      const response = await pool.query('SELECT Lista.genreid, genre.name, Lista.DuracionPromedio \
      FROM (SELECT Track.genreid, AVG(Track.milliseconds) AS DuracionPromedio \
          FROM Track \
            GROUP BY Track.genreid \
            ORDER BY Track.genreid  \
         ) AS Lista INNER JOIN Genre ON Lista.genreid = Genre.genreid;');

      res.json(response.rows);
    }
    if (id==7){
      const response = await pool.query('SELECT PL.playlistid, playlist.name, PL.Artistas \
      FROM (SELECT DISTINCT Playlisttrack.playlistid, COUNT(Album.artistid) AS Artistas \
        FROM Playlisttrack \
          INNER JOIN Track ON Playlisttrack.trackid = Track.trackid \
          INNER JOIN Album ON Album.albumid = Track.albumid \
          GROUP BY Playlisttrack.playlistid \
          ORDER BY Playlisttrack.playlistid \
        ) AS PL INNER JOIN Playlist ON PL.playlistid = Playlist.playlistid;');

      res.json(response.rows);
    }
    if (id==8){
      const response = await pool.query('SELECT ListaC.artistid, Artist.name, ListaC.Cuenta \
      FROM( \
        SELECT ListaG.artistid, COUNT(ListaG.Generos) AS Cuenta \
       FROM( \
         SELECT DISTINCT Album.artistid, Track.genreid AS Generos \
         FROM Track \
           INNER JOIN Album ON Album.albumid = Track.albumid \
         ) AS ListaG \
        GROUP BY ListaG.artistid \
        ) AS ListaC \
          INNER JOIN Artist ON Artist.artistid = ListaC.artistid \
      ORDER BY ListaC.Cuenta DESC \
      LIMIT 5;');

      res.json(response.rows);
    }

    res.json('vacio');
    
  }catch(e){
    console.log(e);
  }
  
}

module.exports = {
  getLogin,
  getSingin,
  getAcccounts,
  getReport
}