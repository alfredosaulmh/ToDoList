import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";


@Component({
  selector: 'task-list',
  templateUrl: '../views/task-list.html',
  providers: [TaskService]
})

export class TaskListComponent implements OnInit{
  public title: string;
  public errorMessage: any;
  tasking: Task[];
  editTask: Task;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskService: TaskService,
  ) {
    this.title = "Listado de tareas";
  }

  ngOnInit(): void {
    console.log("Task List Component list");
    this.getTask();
  }
  getTask(){
    this._taskService.getTasks().subscribe( data => {
      console.log(data);
      this.tasking = data;
      console.log(this.tasking);
      }

    );
  }
  add(description: string): void{
    this.editTask = undefined;
    description = description.trim();
    if (!description){
      return;
    }
    const newTask: Task = { Description: description, status: 'pendient' } as Task;
    this._taskService.addTask(newTask).subscribe(task => this.tasking.push(task));
  }
  delete(task: Task): void {

  }
  edit(task: Task){

  }
  update(){

  }
}
