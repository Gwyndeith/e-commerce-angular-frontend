import { Component, OnInit } from '@angular/core';
import { SalesPerson } from '../../models/sales-person';
import { SalesPersonService } from '../../services/SalesPersonService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrl: './sales-person-list.component.css',
})
export class SalesPersonListComponent implements OnInit {
  private subscriptions!: Subscription;

  constructor(private salesPersonService: SalesPersonService) {}

  public salesPersonList: SalesPerson[] = [];
  ngOnInit(): void {
    this.salesPersonService.getSalesPeopleList();
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.salesPersonService.salesPersonList$.subscribe((salesPersonList) => {
      this.salesPersonList = salesPersonList;
    });
  }
}
