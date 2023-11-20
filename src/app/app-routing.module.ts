import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { StocksComponent } from './stocks/stocks.component';
import { DestatisComponent } from './destatis/destatis.component';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'germany', component: DestatisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
