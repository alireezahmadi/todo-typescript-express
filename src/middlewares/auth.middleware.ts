import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt' 
import authRepository from '../modules/auth/auth.repository'
import {jwt_secret} from '../config/config' 

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: jwt_secret
  
}

export default new Strategy(opts, async( payload, done)=>{
    try{

        const user = await authRepository.retirieveById(payload.id)
        const userInfo = {
            email: user?.email, 
            id: user?.id
        }
        if(user) return done(null, userInfo) 
        return done(null, false)
    }
    catch(err){
      console.log('error', err)
    }
})

