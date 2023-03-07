import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPerson } from '../interface_and_types/person.interface';
import { persons } from '../share/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() {}
  
  persons$:BehaviorSubject<IPerson[]>=new BehaviorSubject(persons) 
  
}
