import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:"",
  loadChildren: () => import('./moduls/show-todos/show-todos.module').then(m => m.ShowTodosModule)  
},
{
  path:"todo",
  loadChildren: () => import('./moduls/create/create.module').then(m => m.CreateModule)  

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
