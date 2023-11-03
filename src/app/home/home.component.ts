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
  updateTaskForm: FormGroup;

  constructor(private myService: MyServiceService, private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['Todo', Validators.required]
    });
    this.updateTaskForm = this.formBuilder.group({
      id: [null, Validators.required],
      status: [null, Validators.required]
    });
  }


  ngOnInit(): void {

    this.myService.getData().subscribe((data: any[]) => {
        this.tasks = data;
        console.log(this.tasks);
      });
    this.loadData();
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

  updateTask() {
    if (this.updateTaskForm.valid) {
      const formData = this.updateTaskForm.value;

      this.myService.updateTask(formData).subscribe(
        (response) => {
          console.log('Task updated:', response);
          this.loadData();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }

}
