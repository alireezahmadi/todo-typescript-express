import  jwt from 'jsonwebtoken'
import {jwt_secret} from '../../config/config'
import bcrypt from 'bcrypt'
import Auth from './auth.model' 


class AuthRepository {

    async comparePassword(candidatePassword: string, password: string): Promise<boolean>{
        const result = await bcrypt.compare(candidatePassword, password)
        return result
    }

    private async issueJwtToken(auth: Auth){

        const token = await jwt.sign({id:auth.id, email: auth.email}, jwt_secret , {expiresIn:'1d'}) 
        return token
    }   

    async retirieveByEmail(user:Auth){
        
        return await Auth.findOne({where:{email:user.email}}) 
    }

    async retirieveById(userId:number){
        
       try{
            return await Auth.findByPk(userId) 
       }
       catch(err){
        throw new Error('Faild to retrive Auth! ')
       }
    }
    async register(body:Auth){
        try{
            const userFound = await this.retirieveByEmail(body)
            if(!userFound) return 

            return await Auth.create({
                email: body.email, 
                password: body.password
            }) 
        }
        catch(err){
            throw new Error('Faild to Create Auth! ')
        }
    }

    async login(body:Auth ){
        try{
            const userFound = await this.retirieveByEmail(body)
            if(!userFound) return 

            const comparePWD = await this.comparePassword(body.password!, userFound.password!) 
            if(!comparePWD) return

            const token = await this.issueJwtToken(userFound)
           
            return {
                userinfo:{
                    email: body.email, 
                    token
                }
            }
        }
        catch(err){
         
            throw new Error('faile to login user!')
        }
    }
}

export default new AuthRepository()