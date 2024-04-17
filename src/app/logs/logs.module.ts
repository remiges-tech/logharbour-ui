import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatachangeLogComponent } from './datachange-log/datachange-log.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ShowactivityLogComponent } from './showactivity-log/showactivity-log.component';
import { LogsRoutingModule } from './logs-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DatachangeLogComponent,
    ShowactivityLogComponent
  ],
  imports: [
    NgxJsonViewerModule,
    LogsRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    RouterModule
  ]
})
export class LogsModule { }
