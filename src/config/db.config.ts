import * as dotenv from 'dotenv' 
dotenv.config() 

export const config = {
    USERNAME: process.env.USERNAME_PSQL,   
    PASSWORD: process.env.PASSPORT_PSQL,   
    HOST: process.env.HOST_PSQL,   
    DB: process.env.DB_PSQL,
}

export const dialect = 'postgres'

