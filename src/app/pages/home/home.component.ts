/* ============================================
 ; Title:  home.component.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: home component
 ===========================================*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { Item } from '../../shared/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService, private httpClient: HttpClient ) {
    this.taskService.findAllTasks().subscribe(res => {
      console.log(res);

      this.todo = res['data'].todo;
      this.done = res['data'].done;

      console.log(this.todo);
      console.log(this.done);
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

}
