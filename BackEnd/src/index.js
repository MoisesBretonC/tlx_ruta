import app from './app.js'
import {connectDB} from './config/db.js'

//Conexion a la base de datos
connectDB();

//Aqui se empieza la api en el servidor correspondiente
app.listen(4000)
console.log("EL servidor esta corriendo en el puerto ", 4000)