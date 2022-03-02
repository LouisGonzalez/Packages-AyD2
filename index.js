//Express
const express = require('./querys-api/node_modules/express');
const app = express();
const path = require('path');

//Permitir CORS origin.
const cors = require('./querys-api/node_modules/cors');
app.use(cors({origin: 'http://localhost:4200'}));

//Puerto de ejecucion del servidor
const port = process.env.PORT || 3002;

app.use(express.static(__dirname+'/front-end/dist'))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/front-end/dist/index.html'))
});



//Conexion con base de datos
const mysql = require('./querys-api/node_modules/mysql');
const myconn = require('./querys-api/node_modules/express-myconnection');
const dbOptions = require('./querys-api/src/database/db');
app.use(myconn(mysql, dbOptions, 'single'));

//Rutas
const baseRoutes = require('./querys-api/src/routes/base-routes');
const destinationRoutes = require('./querys-api/src/routes/destination-routes');
const routeRoutes = require('./querys-api/src/routes/route-routes');
const operatorRoutes = require('./querys-api/src/routes/operator-routes');
app.use(baseRoutes);
app.use(destinationRoutes);
app.use(routeRoutes);
app.use(operatorRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/front-end'))

//Iniciar servidor
app.listen(port, () => {
    console.log("El servidor esta inicializado en el puerto:" + port);
}); 
