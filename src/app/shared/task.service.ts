/* ============================================
 ; Title:  task.service.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   5 October 2020
 ; Description: task service for apis
 ===========================================*/

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }

  //find all tasks for a logged in employee
  findAllTasks(empId: string): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  //create task
  createTask(empId: string, task:string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    });
  }

  //update tasks
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    });
  }

  //delete tasks
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
