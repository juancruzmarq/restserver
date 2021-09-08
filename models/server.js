const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../Database/config');
class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            buscar:      '/api/buscar',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            productos: '/api/productos',
            uploads: '/api/uploads'
        }
        


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
       
        //Carga de archivos 
        this.app.use( fileUpload({
            createParentPath: true,
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
           
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        })
    }

}

module.exports = Server;