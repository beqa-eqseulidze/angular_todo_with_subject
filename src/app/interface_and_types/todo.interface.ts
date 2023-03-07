import { IPerson } from "./person.interface"
import { Status } from "./status.type"

export interface ITodo{
    id?:string,
    title:string,
    description?:string,
    createDate?:Date|string,
    deadLine?:Date|string,
    responsiblePersonId:string|number,    
    responsiblePerson?:IPerson,
    status?:Status
}