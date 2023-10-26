import {Application, Request, Response} from 'express' 
import authRoutes from '../modules/auth/auth.router' 
import todoRoutes from '../modules/todo/todo.router'
import passport from 'passport'

export default class Routes{
    constructor(app: Application){
        app.use('/api', authRoutes),
        app.use('/api/todo',passport.authenticate('jwt', {session:false}) ,todoRoutes), 
        app.all('/*', (req:Request, res:Response)=>{
            res.status(404).send({message:`Not Found ${req.originalUrl}`})
        })
    }
} 