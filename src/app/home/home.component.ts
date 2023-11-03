import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: any[] = [];
  

  constructor(private myService: MyServiceService) { }

  ngOnInit(): void {

    this.myService.getData().subscribe((data: any[]) => {
        this.tasks = data;
        console.log(this.tasks);
      });
  }

  deleteTask(id: number) {
    this.myService.deleteTask(id).subscribe((response) => {
      console.log('Task deleted:', response);
      // You can also remove the deleted task from your tasks array if needed.
    });
  }

}
