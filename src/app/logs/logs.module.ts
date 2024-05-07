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
import { HighpriLogComponent } from './highpri-log/highpri-log.component';
import { DebugLogComponent } from './debug-log/debug-log.component';
import { UnusualIpComponent } from './unusual-ip/unusual-ip.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    DatachangeLogComponent,
    ShowactivityLogComponent,
    HighpriLogComponent,
    DebugLogComponent,
    UnusualIpComponent,
    PaginationComponent
  ],
  imports: [
    NgxJsonViewerModule,
    LogsRoutingModule,
    GoogleMapsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    RouterModule
  ]
})
export class LogsModule { }
