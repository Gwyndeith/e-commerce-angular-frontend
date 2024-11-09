import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesPerson } from '../models/sales-person';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesPersonService {
  private GET_SALES_PEOPLE_URL = environment.apiUrl + '/sales/getSalesPeople';

  private salesPersonListSubject = new BehaviorSubject([]);
  public salesPersonList$ = this.salesPersonListSubject.asObservable();

  constructor(private http: HttpClient) {}

  getSalesPeople() {
    this.http.get(this.GET_SALES_PEOPLE_URL).subscribe((response: any) => {
      this.salesPersonListSubject.next(response);
    });
  }
}
