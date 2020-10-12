/* ============================================
 ; Title:  home.component.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: home component
 ===========================================*/

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { Employee } from 'src/app/shared/employee.interface';
import { TaskService } from 'src/app/shared/task.service';
import { Item } from '../../shared/item.interface';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Item[]; //or Array<Item> (not best practice)
  done: Item[]; //or Array<Item> (not best practice)
  employee: Employee;
  empId: string;

  constructor(private taskService: TaskService, private httpClient: HttpClient, private cookieService: CookieService, private dialog: MatDialog ) {

    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('-----server response from findAllTasks()-----')
      console.log(res);

      this.employee = res.data;
      console.log('-----employee object------')

      //this.todo = res['data'].todo;
      //this.done = res['data'].done;

      //console.log(this.todo);
      //console.log(this.done);
    }, err => {
      console.log(err);
    }, () => {
      //on complete map data to allow enough time for data to populate
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      console.log('this is the complete function');
      console.log(this.todo);
      console.log(this.done)
    })
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {


    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('-----reordered existing list of tasks-----')
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)

      console.log('-----moved task to new container-----');
    }
  }


  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
    this.todo = this.employee.todo
    this.done = this.employee.done})
  }


  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })

      }
    })
  }

  deleteTask(taskId: string) {
    if(taskId) {
      console.log(`Task item" ${taskId} was deleted`);

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })


    }
  }
}
