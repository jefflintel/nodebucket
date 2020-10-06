/* ============================================
 ; Title:  task.service.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   5 October 2020
 ; Description: task service for apis
 ===========================================*/

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;
  baseUrl: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    //get logged in empId
    this.sessionUser = this.cookieService.get('session_user');
    this.baseUrl = 'http://localhost:3000';
  }

  //find all tasks
  findAllTasks() {
    return this.http.get(this.baseUrl + '/api/employees/' + this.sessionUser + '/tasks');
  }

  //create task

  //update tasks

  //delete tasks
}
