import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodo } from '../interface_and_types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 
   
  }

  saveTodos(key:string,todo:ITodo[]):void{
     localStorage.setItem(key,JSON.stringify(todo))
  }
   
  
  
  getTodos(key:string):Observable<ITodo[]|[]>{    
    let text = localStorage.getItem(key)
    if(text){      
      return  of(JSON.parse(text))
    }    
        return of([]);
  }
}
