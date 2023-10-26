import { Router } from "express"; 
import todoValidator from "./todo.validate"; 
import searchValidator from "./validate/search.validate";
import queryValidator from "./validate/query.validate";
import TodoController from "./todo.controller"; 

class TodoRoutes{
    router = Router()
    controller = new TodoController()
    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.get('/all', queryValidator() , this.controller.findAll)
        this.router.get('/:todoId', this.controller.findOne)
        this.router.post('/search', searchValidator(), this.controller.search)
        this.router.put('/:todoId', this.controller.update)
        this.router.post('/', todoValidator(), this.controller.create)
        this.router.delete('/:todoId', this.controller.delete)
    }
}

export default new TodoRoutes().router