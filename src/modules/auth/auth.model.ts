import {Model, Table, Column, DataType} from 'sequelize-typescript' 
import bcrypt from 'bcrypt'

@Table({
    tableName: 'auth', 
    timestamps: false
})
export default class Auth extends Model { 
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        field: 'id'
        
    })
    id?:number;

    @Column({
        type: DataType.STRING,
        unique: true,
        field: 'email', 
        validate:{
            isEmail: true
        }
        
    })
    email?:string;

    @Column({
        type: DataType.STRING,
        set(value: string){
            const salt = bcrypt.genSaltSync(10) 
            const hash: string = bcrypt.hashSync(value, salt) 
            this.setDataValue('password',hash)
        },
        field:'password'
    })
    password?: string

}