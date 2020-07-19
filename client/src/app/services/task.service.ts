import {Injectable} from "@angular/core";
import {HttpClient , HttpHeaders , HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";
import {Task} from "../models/task";
import {GLOBAL} from "./global";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class TaskService {
  public  url: string;


  constructor(
    private _http: HttpClient,
  )
  {
    this.url = GLOBAL.url;
  }
  getTasks(): Observable<Task[]>{
     return this._http.get<Task[]>(this.url + '/to-dos')
    //  return this._http.get(this.url + '/to-dos').pipe(map(res => res));
  }

  addTask(task: Task): Observable<Task>{
    console.log(task);
    return this._http.post<Task>(this.url + '/to-dos', task, httpOptions);
  }
}
