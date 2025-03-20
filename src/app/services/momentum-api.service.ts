import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MomentumApiService {
  constructor(private http: HttpClient) {}
  private token = environment.secretToken;
  private GetEmployeesUrl =
    'https://momentum.redberryinternship.ge/api/employees';
  private GetPrioritiesUrl =
    'https://momentum.redberryinternship.ge/api/priorities';

  private GetDepartmentsUrl =
    'https://momentum.redberryinternship.ge/api/departments';

  private GetTasksUrl = 'https://momentum.redberryinternship.ge/api/tasks';

  private CreateEmplyoeeUrl =
    'https://momentum.redberryinternship.ge/api/employees';

  private GetAllStatusesUrl =
    'https://momentum.redberryinternship.ge/api/statuses';

  private CreateTaskUrl = 'https://momentum.redberryinternship.ge/api/tasks';

  createTask(
    name: string,
    description: string,
    due_date: string,
    status_id: number,
    employee_id: number,
    priortiy_id: number
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('due_date', due_date);
    formData.append('status_id', status_id.toString());
    formData.append('employee_id', employee_id.toString());
    formData.append('priority_id', priortiy_id.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.post(this.CreateTaskUrl, formData, { headers }).subscribe(
      (data) => {
        console.log('Task created:', data);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  createEmployee(
    firstname: string,
    lastname: string,
    avatar: File | null,
    departmentId: number
  ) {
    const formData = new FormData();
    formData.append('name', firstname);
    formData.append('surname', lastname);
    formData.append('department_id', departmentId.toString());
    formData.append('avatar', avatar!, avatar!.name);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http.post(this.CreateEmplyoeeUrl, formData, { headers }).subscribe(
      (data) => {
        console.log('Employee created:', data);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  getTaskComments(id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(
      `//momentum.redberryinternship.ge/api/tasks/${id}/comments`,
      { headers }
    );
  }
  getAllTasks(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.GetTasksUrl, { headers });
  }

  getAllEmployees() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(this.GetEmployeesUrl, { headers });
  }

  getAllPriorities() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(this.GetPrioritiesUrl, { headers });
  }

  getAllDepartments() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(this.GetDepartmentsUrl, { headers });
  }

  getAllStatuses() {
    return this.http.get(this.GetAllStatusesUrl);
  }
}
