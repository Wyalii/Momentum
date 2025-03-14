import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../environments/environments.prod';

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
