import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { ProductSalesChartComponent } from './charts/product-sales-chart/product-sales-chart.component';
import { StockPriceComponent } from './charts/stock-price/stock-price.component';
import { PocLineChartComponent } from './charts/poc-line-chart/poc-line-chart.component';
import { StockSelectorComponent } from './controls/stock-selector/stock-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    ProductSalesChartComponent,
    StockPriceComponent,
    PocLineChartComponent,
    StockSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgChartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
