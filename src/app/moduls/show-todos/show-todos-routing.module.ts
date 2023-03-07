import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowTodosComponent } from './show-todos.component';

const routes: Routes = [
  {
    path:'',
    component: ShowTodosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowTodosRoutingModule { }
