import { Component } from '@angular/core';
import { CreateEmployeeService } from '../../services/create-employee.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public employeeComponentService: CreateEmployeeService) {}
}
