import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'imageUrl',
    'sku',
    'name',
    'description',
    'unitPrice',
    'active',
    'unitsInStock',
    'dateCreated',
    'lastUpdated',
  ];

  public productList = new MatTableDataSource<Product>();
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsSpring();
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.productService.productList$.subscribe((salesPersonList: Product[]) => {
      this.productList.data = salesPersonList;
    });
  }
}
