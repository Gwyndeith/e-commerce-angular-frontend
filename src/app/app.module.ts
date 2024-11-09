import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './components/sales-person-list/sales-person-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatCommonModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { SalesPersonService } from './services/SalesPersonService.service';

@NgModule({
  declarations: [AppComponent, SalesPersonListComponent, ProductListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatTableModule,
    MatRippleModule,
    MatButtonModule,
    MatCardModule,
    MatCommonModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        disabled: false, // Enable ripple globally (set to true to disable ripple globally)
        color: 'rgba(0, 255, 255, 0.8)', // Custom ripple color (blue with some transparency)
        unbounded: false, // Constrained ripple effect (set to true for unbounded ripple)
        animation: { enterDuration: 200, exitDuration: 700 }, // Optional animation customization
      },
    },
    ProductService,
    SalesPersonService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
