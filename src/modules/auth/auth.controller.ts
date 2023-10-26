import {Request, Response} from 'express' 
import AuthRepository from './auth.repository'
import {validationResult} from 'express-validator'
import Auth from './auth.model' 

class AuthController{ 

    private static async validateForm(body: Request): Promise<boolean|object>{ 
        const result = await validationResult(body)
        if(!result.isEmpty()){
            return result.array().map(item => item.msg)
        } 
        return true
    }
    async register(req: Request, res: Response): Promise<Response> {
        try{
            const body:Auth = req?.body 
            const result = await AuthController.validateForm(req) 
            if(typeof result == 'object') return res.status(400).json({message:result})

            const data = await AuthRepository.register(body) 
            if(!data){
                return res.status(400).json({message: 'user has been exists!'})
            } 
            return res.status(201).json({message:`${data.email} was created Successfully!`})

        }
        catch(err){
   
            return res.status(500).json({message:'Some error occurred while create users'})
        }
        
    }

    async login(req: Request, res: Response): Promise<Response> {
        const body:Auth = req?.body 
        try{
            const result = await AuthController.validateForm(req) 
            if(typeof result == 'object') return res.status(400).json({message:result})
            const data = await AuthRepository.login(body)
            if(!data) return res.status(400).json({message:'user not Found'})
            return res.status(200).json(data)

        }
        catch(err){
          
            return res.status(500).json({message:'Some error occurred while login user'})
        }
    }
}

export default AuthController