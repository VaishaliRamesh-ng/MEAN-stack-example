import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { company_details } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class global_service {
  private url = 'http://localhost:8080';
  company_list$ = signal<company_details[]>([]);
  company_details$ = signal<company_details>({} as company_details);
 
  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    debugger
    this.httpClient.get<company_details[]>(`${this.url}/company-list`)
      .subscribe(company_list => {
        this.company_list$.set(company_list);
      });
  }

  getCompanyList() {
    this.refreshEmployees();
    return this.company_list$();
  }

  getCompanyDetails(id: string) {
    this.httpClient.get<company_details>(`${this.url}/company-list/${id}`).subscribe(employee => {
      this.company_details$.set(employee);
      return this.company_details$();
    });
  }

  createCompanyRecord(company_details: company_details) {
    return this.httpClient.post(`${this.url}/company-list`, company_details, { responseType: 'text' });
  }

  updateCompanyRecord(id: string, company_details: company_details) {
    return this.httpClient.put(`${this.url}/company-list/${id}`, company_details, { responseType: 'text' });
  }

  deleteComapnyRecord(id: string) {
    return this.httpClient.delete(`${this.url}/company-list/${id}`, { responseType: 'text' });
  }
}