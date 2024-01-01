import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashComponent } from './dash/dash.component';
import { StocksComponent } from './stocks/stocks.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { ProductSalesChartComponent } from './charts/product-sales-chart/product-sales-chart.component';
import { StockPriceComponent } from './charts/stock-price/stock-price.component';
import { PocLineChartComponent } from './charts/poc-line-chart/poc-line-chart.component';
import { StockSelectorComponent } from './controls/stock-selector/stock-selector.component';
import { DestatisComponent } from './destatis/destatis.component';
import { DividendComponent } from './dividend/dividend.component';
import { DividendSelectorComponent } from './controls/dividend-selector/dividend-selector.component';
import { DividendTableComponent } from './charts/dividend-table/dividend-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    ProductSalesChartComponent,
    StockPriceComponent,
    PocLineChartComponent,
    StockSelectorComponent,
    StocksComponent,
    DestatisComponent,
    DividendComponent,
    DividendSelectorComponent,
    DividendTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgChartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
