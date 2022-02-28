//Express
const express = require('./querys-api/node_modules/express');
const app = express();

//Permitir CORS origin.
const cors = require('./querys-api/node_modules/cors');
app.use(cors({origin: 'http://localhost:4200'}));

//Puerto de ejecucion del servidor
const port = process.env.PORT || 3002;

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

//Iniciar servidor
app.listen(port, () => {
    console.log("El servidor esta inicializado en el puerto:" + port);
}); 
