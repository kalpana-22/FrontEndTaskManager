import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  // { path: '', component: Login },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, BrowserModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
