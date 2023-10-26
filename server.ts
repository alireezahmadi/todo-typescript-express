import express, {Application} from 'express' 
import * as dotenv from 'dotenv' 
dotenv.config()

import Server from './src/index' 

const app: Application = express() 
const server = new Server(app) 
const PORT: number= process.env.PORT ? parseInt(process.env.PORT): 5000

app.listen(PORT, function(){console.log(`Server is running on port ${PORT}`)})
    
  