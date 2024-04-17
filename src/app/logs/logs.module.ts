import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatachangeLogComponent } from './datachange-log/datachange-log.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [
    DatachangeLogComponent
  ],
  imports: [
    NgxJsonViewerModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule
  ]
})
export class LogsModule { }
