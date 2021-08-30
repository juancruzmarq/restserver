const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../Database/config');
class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        //Conexion a bases de datos
        this.conectarDB();

        //Middelwares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio public
        this.app.use( express.static('public'));
       
        
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }

}

module.exports = Server;