import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatachangeLogComponent } from './logs/datachange-log/datachange-log.component';

const routes: Routes = [
  {path:'', component:DatachangeLogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
