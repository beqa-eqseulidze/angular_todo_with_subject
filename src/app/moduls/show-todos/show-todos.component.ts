import { Component, OnDestroy, OnInit } from '@angular/core';
import { find, map, Subscription } from 'rxjs';
import { IPerson } from 'src/app/interface_and_types/person.interface';
import { Status } from 'src/app/interface_and_types/status.type';
import { ITodo } from 'src/app/interface_and_types/todo.interface';
import { PersonService } from 'src/app/services/person.service';
import { StorageService } from 'src/app/services/storage.service';
import { TodoService } from 'src/app/services/todo.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.scss']
})
export class ShowTodosComponent implements OnInit, OnDestroy{

  constructor(
    private personService: PersonService,
    private todoService: TodoService,
    private storageService: StorageService
  ) { }
  subscribtion?: Subscription
  persons:IPerson[]=[]

  todos:ITodo[]=[];
  

  ngOnInit(): any {
    this.getPerson(); 
    this.getTodos();      
   }

  getPerson():void{    
    this.subscribtion=this.personService.persons$.subscribe(ev=>this.persons=ev.map(item=>item));   
  }
  getTodos():void{
   this.subscribtion= this.todoService.getTodos$.subscribe(ev=>this.todos=ev.map(item=>item));      
  }
  delete(id:string|undefined):void{
    this.todoService.deleteTodo(id)
  }
  statusChange(id: string|undefined): void{
    this.todoService.statusChange(id)
  }
    


ngOnDestroy(): void {
  this.subscribtion?.unsubscribe()
}


}
