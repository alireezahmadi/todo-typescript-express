import { Request, Response } from 'express'
import {validationResult} from 'express-validator'
import Todo from './todo.model'
import TodoRepository from './todo.repository' 
import authRepository from '../auth/auth.repository'
import { User } from '../../types/user'



export default class TodoController{
    
    private static async validateForm(body: Request): Promise<boolean|object>{ 
            const result = await validationResult(body)
            if(!result.isEmpty()){
                return result.array().map(item => item.msg)
            } 
            return true
    }

    async create(req: Request, res: Response){
        try{
            
            const result  = await TodoController.validateForm(req)
            if(typeof result == 'object') return res.status(400).json(result)
            const todo: Todo = req.body 
            const {id} = req?.user as User

            
            if(!todo.active) todo.active = true 
            if(!todo.authorId) todo.authorId = id
            if(todo.createdAt) todo.createdAt = new Date(todo.createdAt)
           
            const saveTodo = await TodoRepository.save(todo)
            res.status(200).json(saveTodo)
        }
        catch(err){
          res.status(500).json({message:'Some error occurred while create Todo'})
        }
    }

    async findAll(req: Request, res: Response){
        try{
            const result = await TodoController.validateForm(req)  
            if(typeof result == 'object') return res.status(400).json(result)
            const {id, email} = req?.user as User
            const query: object = req.query 
        
            const todos = await TodoRepository.retrieveAll(id, query) 
            if(todos?.length == 0) return res.status(200).json({message:`${email} not todos`})
            res.status(200).json(todos) 
        }
        catch(err){
            res.status(500).json('Some error occurred while retrieving Todos')
        }
    }

    async findOne(req: Request, res: Response){
      
        const todoId: number = parseInt(req.params.todoId) 
        const {id} = req?.user as User    
        try{
            
            const todo = await TodoRepository.retrieve(todoId, id) 
            if(!todo) return res.status(400).json({message:`Cannot find Todo with id=${todoId}. `})
            
            res.status(200).json(todo)
        }
        catch(err){
            res.status(500).json({message:`Error retrieving Todo with id=${todoId}.`})
        }
    }

    async update(req: Request, res:Response){
        const todoId: number = parseInt(req.params.todoId) 
        const body: Todo = req.body
        const {id} = req?.user as User
        try{
            const todo = await TodoRepository.retrieve(todoId, id)
            if(!todo) return res.status(400).json({message:`Cannot exists Todo with id=${todoId}.`})
            body.id = todoId
            body.authorId = id
            const num  = await TodoRepository.update(body) 
            if(num == 1){
                return res.status(200).json({message:'Todo was updated successfully.'})
            }
            res.status(400).json({message:`Could not update Todo with id==${todoId}`})
        }
        catch(err){
          res.status(500).json({message:`Cannot Update Todo with id=${todoId}. Maybe Todo was not found or req.body is empty!`})
        }
    }

    async delete(req: Request, res: Response){
        const todoId: number = parseInt(req.params.todoId)
        const {id} = req?.user as User 
        try{
            const todo = await TodoRepository.retrieve(todoId, id)
            if(!todo) return res.status(400).json({message:`Cannot find Todo with id=${todoId}.`})
            const num  = await TodoRepository.delete(todoId) 
            if(num == 1){
                return res.status(200).json({message:'Todo was delete successfully.'})
            }
            res.status(400).json({message:`Could not delete Todo with id==${todoId}`})
        }
        catch(err){
            res.status(500).json({message:`Cannot Delete Todo with id=${todoId}. Maybe Todo was not found or req.body is empty!`})
        }
    }

    async search(req:Request, res: Response){
        try{
            const {id} = req?.user as User
            const result = await TodoController.validateForm(req)  
            if(typeof result == 'object') return res.status(400).json(result)
            const user  = await authRepository.retirieveById(id)
            if(!user) return res.status(400).json({message:'user not Found'})
            const query = req?.body
            
            const todos = await TodoRepository.search(query) 
        
            res.status(200).json(todos)
        }
        catch(err){
            res.status(500).json({message:' Some error occurred while retrieving Todos'})
        }
    }
}