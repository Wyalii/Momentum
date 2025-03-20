import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentumApiService } from '../../services/momentum-api.service';
import { CreateEmployeeService } from '../../services/create-employee.service';
import { CreateEmployeeComponent } from '../../components/create-employee/create-employee.component';
@Component({
  selector: 'app-create-task',
  imports: [CommonModule, FormsModule, CreateEmployeeComponent],
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
    console.log(this.employee);
  }

  createTask(
    name: string,
    description: string,
    due_date: string,
    status_id: number,
    employee_id: number,
    priortiy_id: number
  ) {
    this.momentumApiService.createTask(
      name,
      description,
      due_date,
      status_id,
      employee_id,
      priortiy_id
    );
  }

  department: boolean = false;
  departmentList: any = [];
  selectedDepartment: number = 0;
  selectedDepartmentName: string = '';

  employee: boolean = false;
  employeList: any = [];
  selectedEmploye: number = 0;
  selectedEmployeeName: string = '';
  selectedEmployeeAvatar: string = '';

  prioritiesList: any = [];
  priortiy: boolean = false;
  selectedPriortiy: number = 0;
  selectedPriortiyImg: string = '';
  selectedPriorityName: string = '';

  status: boolean = false;
  statusList: any = [];
  selectedStatus: number = 0;
  selectedStatusName: string = '';

  title: string = '';
  description: string = '';
  date: string = '';

  selectStatus(statusInput: any) {
    this.selectedStatus = statusInput.id;
    this.selectedStatusName = statusInput.name;

    setTimeout(() => {
      this.status = false;
    });
  }

  selectPriority(priorityInput: any) {
    this.selectedPriortiy = priorityInput.id;
    this.selectedPriorityName = priorityInput.name;
    this.selectedPriortiyImg = priorityInput.icon;
    setTimeout(() => {
      this.priortiy = false;
    });
  }

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

    console.log(this.employee);
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

    this.momentumApiService.getAllStatuses().subscribe(
      (data: any) => {
        this.statusList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
