import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatachangeLogComponent } from './datachange-log/datachange-log.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DatachangeLogComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule
  ]
})
export class LogsModule { }
