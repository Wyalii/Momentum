import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateEmployeeService {
  constructor() {}
  CreateEmployeeComponent = signal(false);
}
