import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private GET_SALES_PEOPLE_URL_SPRING = environment.springApiUrl + '/products';

  private productListSubject = new BehaviorSubject([]);
  public productList$ = this.productListSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProductsSpring() {
    this.http
      .get(this.GET_SALES_PEOPLE_URL_SPRING)
      .subscribe((response: any) => {
        this.productListSubject.next(response._embedded.products);
        console.log(response._embedded.products);
      });
  }
}
