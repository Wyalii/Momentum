import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MomentumApiService } from '../../services/momentum-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateEmployeeService } from '../../services/create-employee.service';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CreateEmployeeComponent implements OnInit {
  constructor(
    public momentumApiService: MomentumApiService,
    public createEmployeeService: CreateEmployeeService
  ) {}

  departmentList: any = [];
  department: boolean = false;
  selectedDepartment: number = 0;
  selectedDepartmentName: string = '';
  firstname: string = '';
  lastname: string = '';
  avatarPreview: string = '';
  avatarFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.loadData();
  }

  createEmployee(
    firstname: string,
    lastname: string,
    avatar: File | null,
    departmentId: number
  ) {
    this.momentumApiService.createEmployee(
      firstname,
      lastname,
      avatar,
      departmentId
    );
  }

  selectDepartment(departmentInput: any) {
    this.selectedDepartment = departmentInput.id;
    this.selectedDepartmentName = departmentInput.name;
    console.log(this.selectedDepartment);

    setTimeout(() => {
      this.department = false;
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
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.avatarPreview = URL.createObjectURL(file);
      this.avatarFile = file;
    }
    console.log(this.avatarFile);
  }
}
