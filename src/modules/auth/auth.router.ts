import {Router} from 'express' 
import AuthController from './auth.controller' 
import AuthValidator from './auth.validate'

class AuthRoutes{
    router = Router() 
    controller = new AuthController() 
    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.post('/login' , AuthValidator(), this.controller.login)
        this.router.post('/register',AuthValidator(), this.controller.register)
    }
}

export default new AuthRoutes().router