import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowTodosRoutingModule } from './show-todos-routing.module';
import { ShowTodosComponent } from './show-todos.component';


@NgModule({
  declarations: [
    ShowTodosComponent
  ],
  imports: [
    CommonModule,
    ShowTodosRoutingModule
  ]
})
export class ShowTodosModule { }
