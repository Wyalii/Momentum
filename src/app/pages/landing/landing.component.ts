import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MomentumApiService } from '../../services/momentum-api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-landing',
  imports: [CommonModule, HttpClientModule],
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
  constructor(public momentumApiService: MomentumApiService) {}
  ngOnInit(): void {
    this.GetAllEmployees();
    this.GetAllDepartments();
    this.GetAllPriorities();
  }

  employess: any = [];
  departmentList: any[] = [];
  prioritiesList: any[] = [];

  selectedColleagues: string[] = [];
  selectedDepartments: string[] = [];
  selectedPriorities: string[] = [];

  departments: boolean = false;
  colleagues: boolean = false;
  priorities: boolean = false;

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

  GetAllEmployees() {
    this.momentumApiService.getAllEmployees().subscribe(
      (data: any) => {
        this.employess = data;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.employess);
  }

  GetAllPriorities() {
    this.momentumApiService.getAllPriorities().subscribe(
      (data: any) => {
        this.prioritiesList = data;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.prioritiesList);
  }

  GetAllDepartments() {
    this.momentumApiService.getAllDepartments().subscribe(
      (data: any) => {
        this.departmentList = data;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.departmentList);
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
