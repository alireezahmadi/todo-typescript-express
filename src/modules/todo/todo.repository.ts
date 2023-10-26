import { Op } from 'sequelize';
import Todo from './todo.model'  
import Auth from '../auth/auth.model'

interface ITodoRepository { 
    save(todo:Todo): Promise<Todo>, 
    retrieveAll(authorId: number, searchParams: {priorety?:string, createdAt?: string }):Promise<Todo[] | undefined>, 
    retrieve(todoId:number, authorId:number):Promise<Todo | null>, 
    update(todo: Todo):Promise<number>, 
    delete(todoId: number):Promise<number>, 
    search(searchParams: {priorety?: number, startDate?: Date, endDate?: Date, active?: boolean}): Promise<Todo[] | undefined>
} 

interface searchCondition {
    [key: string]: any
} 

class TodoRepository implements ITodoRepository{

    async save(todo: Todo): Promise<Todo> {
        try{
            return await Todo.create({...todo})
        }
        catch(err){
            throw new Error('Failed to create Todo! ')
        }
    }
    async retrieveAll(authorId: number, searchParams: { priorety?: string; createdAt?: string }): Promise<Todo[] | undefined> {
        try{
            let condition: searchCondition = {}
            if(searchParams?.priorety){
                condition.order = searchParams.priorety == 'ASC' ? [['priorety', 'ASC']] :[['priorety', 'DESC']]
            }
            if(searchParams?.createdAt){
                condition.order = searchParams.createdAt == 'ASC' ? [['createdAt', 'ASC']] :[['createdAt', 'DESC']]
            }
            const order = condition?.order ? condition.order:[]
            const include = {
                    model:Auth,
                    attributes:{exclude:['password']}
                }
                

            return await Todo.findAll({where: {authorId}, order, include, attributes:{exclude:['authorId']} })
        }
        catch(err){
            throw new Error('Failed to retrieve Todos! ')
        }
    }
    async retrieve(todoId:number, authorId:number): Promise<Todo | null> {
        try{
            return await Todo.findOne({where:{[Op.and]:{id:todoId, authorId}}})
        }
        catch(err){
            throw new Error('Failed to retrieve Todo! ')
        }
    }
    async update(todo: Todo): Promise<number> {
        try{
            const {id, title, description, active, priorety, createdAt, authorId} = todo
            const affectedRows = await Todo.update(
                {title, description, active, createdAt, priorety}, 
                {where:{[Op.and]: {id, authorId}}}
            )
            return affectedRows[0]
        }
        catch(err){
            throw new Error('Failed to update Todo! ')
        }
    }
    async delete(todoId: number): Promise<number> {
        try{
            const affectedRows = await Todo.destroy({where:{id: todoId}})
            console.log(' \n affectedRows \n',affectedRows )
            return affectedRows
        }
        catch(err){
            throw new Error('Failed to delete Todo! ')
        }
    }

    async search(searchParams: { authorId?:number, priorety?: number; startDate?: object; endDate?: object; active?: boolean; }): Promise<Todo[] | undefined> {
        try{
            let condition: searchCondition = {} 
            if(searchParams.authorId) condition.authorId = searchParams.authorId 
            if(searchParams.priorety) condition.priorety = searchParams.priorety 
            if(searchParams.startDate && searchParams.endDate) condition.createdAt = {[Op.between]: [searchParams.startDate, searchParams.endDate]} 
            typeof searchParams.active == 'boolean' ? condition.active = searchParams.active :null
            return await Todo.findAll({where:condition})

        }   
        catch(err){
            throw new Error('Failed to retrieve Todo! ')
        }
    }

}

export default new TodoRepository()