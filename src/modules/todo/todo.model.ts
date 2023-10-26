import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript"; 
import Auth from '../auth/auth.model' 

@Table({
    tableName: 'todo', 
    timestamps: false
})
export default class Todo extends Model{

    @Column({
        type: DataType.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        field: 'id'
    })
    id?:number;

    @Column({
        type: DataType.STRING(255), 
        field: 'title'
    })
    title?: string;

    @Column({
        type: DataType.STRING(), 
        field: 'description'
    })
    description?: string; 

    @ForeignKey(()=> Auth)
    authorId?:number;

    @BelongsTo(()=> Auth, "authorId")
    author?:Auth;

    @Column({
        type: DataType.INTEGER,
        validate:{
            min:1, 
            max:4
        },
        defaultValue: 1,
        field: 'priorety'
    })
    priorety?: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
        field: 'active'
    })
    active?: boolean;

    @Column({
        type: DataType.DATE,
        defaultValue:new Date(),
        field: 'create'
    })
    createdAt?: Date;

}