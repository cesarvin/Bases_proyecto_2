var express = require('express');
var app = express();

const { Pool } = require('pg');
const { config } = require('../src/db.json');

pool = new Pool(config); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.all('/*', function(request, response, next) {
      response.header("Access-Control-Allow-Origin", "*");
      response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
      if (request.method == 'OPTIONS') {
            response.status(200).end();
      } else {
            next();
      }
});

//action type 
app.use(require('./routes/seguridad/actionType'));

//option
app.use(require('./routes/seguridad/option'));

//rol
app.use(require('./routes/seguridad/rol'));

//rol option
app.use(require('./routes/seguridad/rolOption'));

//rol account
app.use(require('./routes/seguridad/rolAccount'));

//action
app.use(require('./routes/seguridad/action'));

//account
app.use(require('./routes/seguridad/account'));

//artist
app.use(require('./routes/app/artist'));

//album
app.use(require('./routes/app/album'));

//track
app.use(require('./routes/app/track'));

app.use(function (error, request, response, next) {
      console.error(error.stack);
      response.status(400).send(error.message);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Node server listening on port ' + server.address().port + ".");
});