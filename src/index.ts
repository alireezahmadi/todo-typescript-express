import express, {Application} from 'express' 
import cors, {CorsOptions} from 'cors' 
import passport from 'passport' 
import Database from './db/index' 
import Routes from '../src/routes/index'
import authMiddleware from './middlewares/auth.middleware'

export default class Server{
   

    constructor(app:Application){
        this.config(app)
        this.syncDatabase()
        new Routes(app)
     
        
    }

    private config(app: Application){
        const corsOptions: CorsOptions = {
            origin: ['http://localhost:5000']
        }

        app.use(cors(corsOptions))
        app.use(express.json())
        app.use(express.urlencoded({extended:false})) 
        app.use(passport.initialize())
        passport.use(authMiddleware)
    }

    private syncDatabase(){
        const db = new Database() 
        db.sequelize?.sync()
        
    }
}