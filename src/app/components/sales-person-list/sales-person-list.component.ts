import { Component, OnInit } from '@angular/core';
import { SalesPerson } from '../../models/sales-person';
import { SalesPersonService } from '../../services/SalesPersonService.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrl: './sales-person-list.component.css',
})
export class SalesPersonListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'salesVolume',
    'metQuota',
  ];
  public salesPersonList = new MatTableDataSource<SalesPerson>();
  constructor(private salesPersonService: SalesPersonService) {}

  ngOnInit(): void {
    this.salesPersonService.getSalesPeople();
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.salesPersonService.salesPersonList$.subscribe(
      (salesPersonList: SalesPerson[]) => {
        this.salesPersonList.data = salesPersonList;
      }
    );
  }
}
