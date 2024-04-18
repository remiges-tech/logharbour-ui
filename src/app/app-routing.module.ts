import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatachangeLogComponent } from './logs/datachange-log/datachange-log.component';
import { PageNotFoundComponent } from './logs/page-not-found/page-not-found.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
