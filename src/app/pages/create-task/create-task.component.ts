import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentumApiService } from '../../services/momentum-api.service';
import { CreateEmployeeService } from '../../services/create-employee.service';
@Component({
  selector: 'app-create-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  constructor(
    public momentumApiService: MomentumApiService,
    public createEmployeeService: CreateEmployeeService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  departmentList: any = [];
  department: boolean = false;
  employee: boolean = false;
  selectedDepartment: number = 0;
  selectedDepartmentName: string = '';
  prioritiesList: any = [];
  employeList: any = [];
  selectedEmploye: number = 0;
  selectedEmployeeName: string = '';
  selectedEmployeeAvatar: string = '';

  selectDepartment(departmentInput: any) {
    this.selectedDepartment = departmentInput.id;
    this.selectedDepartmentName = departmentInput.name;
    console.log(this.selectedDepartment);

    setTimeout(() => {
      this.department = false;
    });
  }

  selectEmploye(employeInput: any) {
    this.selectedEmploye = employeInput.id;
    this.selectedEmployeeName = employeInput.name;
    this.selectedEmployeeAvatar = employeInput.avatar;
    console.log(this.selectedEmploye);

    setTimeout(() => {
      this.employee = false;
    });
  }

  loadData() {
    this.momentumApiService.getAllDepartments().subscribe(
      (data: any) => {
        this.departmentList = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.momentumApiService.getAllPriorities().subscribe(
      (data: any) => {
        this.prioritiesList = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.momentumApiService.getAllEmployees().subscribe(
      (data: any) => {
        this.employeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
