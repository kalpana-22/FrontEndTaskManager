import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(private myService: MyServiceService, private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['Todo', Validators.required]
    });
  }

  ngOnInit(): void {

    this.myService.getData().subscribe((data: any[]) => {
        this.tasks = data;
        console.log(this.tasks);
      });
  }

  createTask() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Task data to be sent:', taskData);
  
      this.myService.postTask(taskData).subscribe(
        (response) => {
          console.log('Task created:', response);
          // Clear the form and update the task list if needed
          this.taskForm.reset();
          this.loadData();
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
  

  loadData() {
    // You can reload the task data here
    this.myService.getData().subscribe((data: any[]) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

  deleteTask(id: number) {
    this.myService.deleteTask(id).subscribe((response) => {
      console.log('Task deleted:', response);
    });
  }

}
