import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, Params} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";

export interface  type{
  id: string;
  status: string;
}


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
  public statusList:type[] = [
    {id:"pendient", status: "Pendiente"},
    {id:"inprogress", status: "En Progreso"},
    {id:"success", status: "Completada"}
  ];



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _taskService: TaskService,
  ) {
    this.title = "Listado de tareas";
  }

  ngOnInit(): void {
    this.statusList;
    console.log("Task List Component list");
    console.log(this.statusList);
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
    this.tasking = this.tasking.filter(t => t !== task);
    this._taskService.deleteTask(task.id).subscribe();

  }
  edit(task: Task){
    this.editTask = task;

  }
  update(){
    if (this.editTask){
      this._taskService.updateTask(this.editTask).subscribe( task => {
        const ix = task ? this.tasking.findIndex(t => t.id === task.id) : -1 ;
        if (ix > -1){
          this.tasking[ix] = task;
        }
      });
      this.editTask = undefined;
    }

  }
}
