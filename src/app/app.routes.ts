import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'createTask', component: CreateTaskComponent },
];
