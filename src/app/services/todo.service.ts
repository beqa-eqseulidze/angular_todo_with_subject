import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, find, flatMap, from, map, mergeMap, Observable, of, Subscription } from 'rxjs';
import { ITodo } from '../interface_and_types/todo.interface';
import { PersonService } from './person.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {
 
  constructor(
    private storageService:StorageService,
    private personService:PersonService  ,    
  ) { }
  subscription?:Subscription

  getTodosFromStorage():ITodo[]|[]{
    let result:ITodo[] = [];
    this.subscription=this.storageService.getTodos('todos').subscribe(ev=>result=ev.map(todo=>todo))
    return result
  }
  
  getTodos$:BehaviorSubject<ITodo[]|[]>=new BehaviorSubject(this.getTodosFromStorage())
  
  getTodosById(id:string):Observable<ITodo|undefined>{
  let todos=this.getTodos$.getValue().find(todo=>todo.id===id)
  return of(todos)
 }

  addTodo(todo:ITodo):Observable<boolean>{
    todo.id=Math.random().toString(36).slice(2)    
    todo.createDate=new Date,         
    todo.status='pending'    
   this.subscription=this.personService.persons$.
    subscribe(person=>todo.responsiblePerson=person.find(p => p.id===todo.responsiblePersonId));
    this.getTodos$.next([...this.getTodos$.getValue(),todo]);
    this.storageService.saveTodos('todos',this.getTodos$.getValue());
    return of(true)
  }

  updateTodos(todo:ITodo,id:string):Observable<boolean>{     
          let todos:ITodo[]=[];
          this.subscription=this.getTodos$.subscribe(ev=>todos=ev.map(item=>item)) // ეს ხაზი todos ანიჭებს მნიშვლნელობას (map ის გარეშე ახალი მასივი არ შეიქმნებოდა)
          let index=todos.findIndex(item=>item.id===id);
          todos.forEach(item=>{
            if(item.id===id){
                if(item.responsiblePersonId!==todo.id){
                    this.subscription=this.personService.persons$.subscribe((persons)=>{
                      todo.responsiblePerson=persons.find(person=>person.id===todo.responsiblePersonId)
                    })
                }
            }
          })        
          todos[index]={...todos[index],...todo}        
          this.getTodos$.next(todos);
          this.storageService.saveTodos('todos',this.getTodos$.getValue());
        
        return of(true)
  }

 
  deleteTodo(id:string|undefined):void{  
    const todos=this.getTodos$.getValue().filter(todo=>todo.id!==id);
    this.getTodos$.next(todos);
    this.storageService.saveTodos('todos', todos);
  }

  statusChange(id: string | undefined) {

          let todos:ITodo[]=[];
          this.subscription=this.getTodos$.subscribe(ev=>todos=ev.map(item=>item)) // ეს ხაზი todos ანიჭებს მნიშვლნელობას (map ის გარეშე ახალი მასივი არ შეიქმნებოდა)
          let index=todos.findIndex(item=>item.id===id);
          if(todos[index].status)
          todos[index].status==="pending"? todos[index].status="completed":todos[index].status="pending";
          this.getTodos$.next(todos);
          this.storageService.saveTodos('todos',this.getTodos$.getValue());
   
  }


 ngOnDestroy():void {
  this.subscription?.unsubscribe()
 }



}