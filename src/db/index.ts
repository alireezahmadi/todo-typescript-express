import { Sequelize } from "sequelize-typescript"; 
import {config, dialect} from '../config/db.config' 
import Auth from './../modules/auth/auth.model' 
import Todo from './../modules/todo/todo.model'

class Database{
    public sequelize: Sequelize | undefined  

    constructor() {
        this.connectToDatabase()
    }

    private async connectToDatabase(){
        this.sequelize = new Sequelize({
            
            database: config.DB, 
            username:config.USERNAME , 
            password: config.PASSWORD, 
            host:config.HOST , 
            dialect,
            port: 5432, 
            models: [Auth, Todo]
        })

        await this.sequelize
                .authenticate()
                .then(() => {
                  console.log('Connection has been established successfully. ')
                 
                })
                .catch((err:any) => {
                  console.log('Unable to connect to the Database', err )
                })
    }
}

export default Database