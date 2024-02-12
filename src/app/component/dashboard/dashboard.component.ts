import { Task } from 'src/app/model/task';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskobj: Task = new Task();

  taskarr: Task[] = [];

  addTaskValue: string = '';
  editTaskvalue:string=''
  constructor(private CrudService: CrudService) {}
  ngOnInit(): void {

    this.editTaskvalue = '';
    this.addTaskValue = '';
    this.taskobj = new Task();
    this.taskarr = [];
    this.getAllTask();

  }
  getAllTask() {
    this.CrudService.getAllTask(this.taskobj).subscribe(
      (res) => {
        this.taskarr = res;
      },
      (err) => {
        alert;
      }
    );
  }
  addTask() {
    this.taskobj.task_name=this.addTaskValue
    this.CrudService.addTask(this.taskobj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask()
  {
      this.taskobj.task_name=this.editTaskvalue;
      this.CrudService.editTask(this.taskobj).subscribe(res => {
        this.ngOnInit();
      },err =>{
        alert("Failed to update Task")
      })
  }

  deleteTask(etask:Task)
  {
     this.CrudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
     },err => {
      alert("Failed to Delete Task")
     })
  }

  call(etask:Task)
  {
    this.taskobj =etask;
    this.editTaskvalue=etask.task_name;
  }
}
