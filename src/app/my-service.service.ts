import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  tasks: Object[] = [];

  constructor(private http: HttpClient) { 
    // this.getData().subscribe((data: Object[]) => {
    //   this.tasks = data;
    //   console.log(this.tasks);
    // });
     
  }

  getData(): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:8080/tasks/allTasks');
  }
  getTasksByStatus() {
    return this.http.get('http://localhost:8080/tasks/type/{status}');
  }
  getTasksByUserId() {
    return this.http.get('http://localhost:8080/tasks/userId');
  }
  postTask(task: any): Observable<any> {
    return this.http.post('http://localhost:8080/tasks/add', task);
  }
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/tasks/remove?id=${id}`);
  }
  updateTask() {
    return this.http.post('http://localhost:8080/tasks/update',String);
  }
}
