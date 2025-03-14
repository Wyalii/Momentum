import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../environments/environments.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MomentumApiService {
  constructor(private http: HttpClient) {}
  private token = enviroment.secretToken;
  private GetEmployeesUrl =
    'https://momentum.redberryinternship.ge/api/employees';
  private GetPrioritiesUrl =
    'https://momentum.redberryinternship.ge/api/priorities';

  private GetDepartmentsUrl =
    'https://momentum.redberryinternship.ge/api/departments';

  private GetTasksUrl = 'https://momentum.redberryinternship.ge/api/tasks';

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
}
