import * as dotenv from 'dotenv' 
dotenv.config()

export const jwt_secret:string  = process.env.JWT_SECRECT!