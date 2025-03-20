import { Component } from '@angular/core';
import { CreateEmployeeService } from '../../services/create-employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public employeeComponentService: CreateEmployeeService,
    private router: Router
  ) {}
  goToCreateTask() {
    this.router.navigate(['/createTask']);
  }
  goToHomePage() {
    this.router.navigate(['/']);
  }
}
