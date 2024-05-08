import { Component, Input, inject } from '@angular/core';
import { LogEntry } from 'src/models/common-interfaces';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-log-entry',
  template: `
    <ng-container *ngIf="data != undefined">
    <div class="card my-3" *ngFor="let log of data | paginate: { itemsPerPage: itemPerPage, currentPage: currentPage}">
      <div class="card-body">
        <div class="row p-3">
          <div class="col-6">
            <h5><strong i18n="@@User">User: </strong> {{ log.who }}</h5>
          </div>
          <div class="col-6">
            <h5><strong i18n="@@RemoteIP">Remote IP: </strong> {{ log.remote_ip }}</h5>
          </div>
          <!-- <div class="col-6">
            <h5><strong i18n="@@Operation">Operation: </strong> {{ log.data.change_data?.op }}</h5>
          </div> -->
          <div class="col-6">
            <h5>
              <strong i18n="@@Timestamp">Timestamp: </strong>
              {{ log.when | date : "MMM d, y, h:mm:ss a" }}
            </h5>
          </div>
          <div class="col-12">
            <h5><strong i18n="@@Description">Description: </strong> {{ log.msg }}</h5>
          </div>
        </div>
        <!-- Change Data Log -->
        <ng-container *ngIf="log.data.change_data">
          <div class="card no-border m-2" *ngFor="let dataChangeLog of log.data.change_data.changes">
            <div class="card-title mt-2">
              <div class="row">
                <div class="col-6">
                  <h4 class="p-2">
                    <strong i18n="@@fieldName">Field Name: </strong> {{ dataChangeLog.field }}
                  </h4>
                </div>
                <div class="col-6">
                  <h4 class="p-2">
                    <strong i18n="@@Operation">Operation: </strong> {{ log.data.change_data.op }}
                  </h4>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div>
                <strong i18n="@@oldValue">Old Value :</strong>
                <ngx-json-viewer [json]="dataChangeLog.old_value" [expanded]="false"></ngx-json-viewer>
              </div>
              <div>
                <strong i18n="@@newValue">New Value :</strong>
                <ngx-json-viewer [json]="dataChangeLog.new_value" [expanded]="false"></ngx-json-viewer>
              </div>
            </div>
          </div>
        </ng-container>
        <!-- Activity Log -->
        <ng-container *ngIf="log.data.activity_data">
          <div class="card no-border m-2">
            <div class="card-body">
              <div><strong i18n="@@activityLog">Activity Log :</strong> <ngx-json-viewer [json]="log.data.activity_data" [expanded]="false"></ngx-json-viewer></div>
            </div>
          </div>
        </ng-container>
        <!-- Debug Log -->
        <ng-container *ngIf="log.data.debug_data">
          <div class="card no-border m-2">
            <div class="card-body">
              <div><strong i18n="@@activityLog">Debug Log :</strong> <ngx-json-viewer [json]="log.data.debug_data" [expanded]="false"></ngx-json-viewer></div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
    </ng-container>
  `
})

export class LogEntryComponent {
  public _commonService = inject(CommonService);
  @Input({ required: true }) data?: LogEntry[];
  @Input({ required: true }) itemPerPage: number = 5;
  @Input({ required: true }) currentPage: number = 1;
}
