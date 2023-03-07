import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { TodoService } from 'src/app/services/todo.service';
import { IPerson } from 'src/app/interface_and_types/person.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit,OnDestroy {

  constructor(
    private personService:PersonService,
    private todoService:TodoService,
    private router:Router   ,
    private activatedRoute:ActivatedRoute
  ) { }
 
 
  subscription?:Subscription
  persons:IPerson[]=[];
  todoId:string|null=null;

  ngOnInit(): void { 
    this.subscription=this.personService.persons$.subscribe(p=>this.persons = p)
    this.subscription=this.activatedRoute.params.subscribe(params =>{
      if(params['id']) this.todoId=params['id']
    }) 
    if(this.todoId){
      let todo
      this.subscription=this.todoService.getTodosById(this.todoId).subscribe(ev=>todo=ev);     
      if(todo) this.form.patchValue(todo);   
    }
  }

  form :FormGroup= new FormGroup({
       title:new FormControl('',Validators.required),
       description:new FormControl('',Validators.required),
       deadLine:new FormControl('',Validators.required),
       responsiblePersonId:new FormControl('',Validators.required)
      }); 
  
  submit():void{ 
      if(this.todoId){
        this.subscription=this.todoService.updateTodos(this.form.value,this.todoId).subscribe(()=>this.router.navigate([''])
        )

      }else{
        if(this.form.valid){
          this.subscription=this.todoService.addTodo(this.form.value).subscribe(()=>{     // new todo functionality 
            this.router.navigate([''])
          })
        }else alert('fill all fild')                                                        // if this todoId is not exist yet then activated 
      }
  
    }
    
    
ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}
      


}
