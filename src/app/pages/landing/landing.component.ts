import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MomentumApiService } from '../../services/momentum-api.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from '../../components/task/task.component';
import { CreateEmployeeComponent } from '../../components/create-employee/create-employee.component';
import { CreateEmployeeService } from '../../services/create-employee.service';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    HttpClientModule,
    TaskComponent,
    CreateEmployeeComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  animations: [
    trigger('fadeInDrop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class LandingComponent implements OnInit {
  constructor(
    public momentumApiService: MomentumApiService,
    public createEmployeeService: CreateEmployeeService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  readyToStartTasks: any = [];
  inProgressTasks: any = [];
  readyToTests: any = [];
  finishedTasks: any = [];

  employess: any = [];
  departmentList: any[] = [];
  prioritiesList: any[] = [];

  selectedColleagues: string[] = [];
  selectedDepartments: string[] = [];
  selectedPriorities: string[] = [];

  departments: boolean = false;
  colleagues: boolean = false;
  priorities: boolean = false;

  getFilteredTasks(
    selectedColleagues: any[],
    selectedDepartments: any[],
    selectedPriorities: any[]
  ) {
    this.momentumApiService.getAllTasks().subscribe((data: any[]) => {
      this.readyToStartTasks = data.filter(
        (task) =>
          task.status.id === 1 &&
          this.applyFilters(
            task,
            selectedColleagues,
            selectedDepartments,
            selectedPriorities
          )
      );

      this.inProgressTasks = data.filter(
        (task) =>
          task.status.id === 2 &&
          this.applyFilters(
            task,
            selectedColleagues,
            selectedDepartments,
            selectedPriorities
          )
      );

      this.readyToTests = data.filter(
        (task) =>
          task.status.id === 3 &&
          this.applyFilters(
            task,
            selectedColleagues,
            selectedDepartments,
            selectedPriorities
          )
      );

      this.finishedTasks = data.filter(
        (task) =>
          task.status.id === 4 &&
          this.applyFilters(
            task,
            selectedColleagues,
            selectedDepartments,
            selectedPriorities
          )
      );
    });
  }

  applyFilters(
    task: any,
    selectedColleagues: any[],
    selectedDepartments: any[],
    selectedPriorities: any[]
  ) {
    const matchesColleague =
      selectedColleagues.length === 0 ||
      selectedColleagues.includes(task.employee.id);

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(task.department.id);

    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(task.priority.id);

    return matchesColleague && matchesDepartment && matchesPriority;
  }

  toggleColleagueSelection(colleague: any) {
    const colleagueId = colleague.id;
    if (this.selectedColleagues.includes(colleagueId)) {
      this.selectedColleagues = this.selectedColleagues.filter(
        (id) => id !== colleagueId
      );
    } else {
      this.selectedColleagues.push(colleagueId);
    }
  }

  isColleagueSelected(colleague: any): boolean {
    return this.selectedColleagues.includes(colleague.id);
  }

  togglePrioritySelection(priority: any) {
    const priorityId = priority.id;
    if (this.selectedPriorities.includes(priorityId)) {
      this.selectedPriorities = this.selectedPriorities.filter(
        (p) => p !== priorityId
      );
    } else {
      this.selectedPriorities.push(priorityId);
    }
  }

  isPrioritySelected(priority: any): boolean {
    return this.selectedPriorities.includes(priority.id);
  }

  toggleDepartmentSelection(department: any) {
    const departmentId = department.id;
    if (this.selectedDepartments.includes(departmentId)) {
      this.selectedDepartments = this.selectedDepartments.filter(
        (d) => d !== departmentId
      );
    } else {
      this.selectedDepartments.push(departmentId);
    }
  }

  isDepartmentSelected(department: any): boolean {
    return this.selectedDepartments.includes(department.id);
  }

  loadData() {
    this.momentumApiService.getAllTasks().subscribe(
      (data: any[]) => {
        this.readyToStartTasks = data.filter((task) => task.status.id === 1);
        this.inProgressTasks = data.filter((task) => task.status.id === 2);
        this.readyToTests = data.filter((task) => task.status.id === 3);
        this.finishedTasks = data.filter((task) => task.status.id === 4);
      },
      (error) => {
        console.log(error);
      }
    );

    this.momentumApiService.getAllEmployees().subscribe(
      (data: any) => {
        this.employess = data;
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

    this.momentumApiService.getAllDepartments().subscribe(
      (data: any) => {
        this.departmentList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectFilterMenu(filter: string) {
    if (filter === 'departments') {
      this.departments = !this.departments;
      if (this.departments) {
        this.colleagues = false;
        this.priorities = false;
      }
    } else if (filter === 'colleagues') {
      this.colleagues = !this.colleagues;
      if (this.colleagues) {
        this.departments = false;
        this.priorities = false;
      }
    } else if (filter === 'priorities') {
      this.priorities = !this.priorities;
      if (this.priorities) {
        this.departments = false;
        this.colleagues = false;
      }
    }
  }
}
