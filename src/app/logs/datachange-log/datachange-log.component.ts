
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { commonLists, logData } from 'src/models/common-interfaces';
import { DataChangeLogReq } from 'src/models/request-interfaces';
import { DataChangeLogResp } from 'src/models/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS, GETSETFIELDS } from 'src/services/constants.service';
import { DatachangeLogService } from 'src/services/datachange-log.service';
import { CommonMethodsService } from '../common-methods.service';

interface SelectedDataInterface {
  apps: string | undefined,
  class?: string,
  users?: string,
  entityId?: string,
  fields?: string,
  days: number
}
@Component({
  selector: 'app-datachange-log',
  templateUrl: './datachange-log.component.html',
  styleUrls: ['./datachange-log.component.scss']
})
export class DatachangeLogComponent {
  fileName: string = 'DatachangeLogComponent';
  private _dataChangeLogService = inject(DatachangeLogService);
  private _commonMethodService = inject(CommonMethodsService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 50
  }
  lists: commonLists = {
    apps: [],
    class: [],
    instance: [],
    field: [],
    who: []
  }

  dataChangeLogs: logData = {
    data: [],
    dataCount: 0
  };


  ngOnInit() {
    this._commonMethodService.getAppsList(this.lists)
  }

  appChangeHandler() {
    if (this.selectedData.apps == undefined || this.selectedData.apps == null) {
      this.selectedData.class = undefined;
      this.selectedData.entityId = undefined;
      this.selectedData.fields = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.CLASS);
    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.WHO);
  }

  classChangeHandler() {
    if (this.selectedData.class == undefined || this.selectedData.class == null) {
      this.selectedData.entityId = undefined;
      this.selectedData.fields = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.INSTANCE);
  }

  entityChangeHandler() {
    if (this.selectedData.entityId == undefined || this.selectedData.entityId == null) {
      this.selectedData.fields = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.FIELD);
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 50,
      class: undefined,
      fields: undefined,
      users: undefined,
      entityId: undefined
    }

    this.dataChangeLogs = {
      data: [],
      dataCount: 0
    };
  }

  getDataChangeLogs(isNext: boolean = false, timeStamp?: string) {
    if (this.selectedData.apps == undefined || this.selectedData.days == undefined) {
      this._toastr.error('Application and Days must be selected first.', CONSTANTS.ERROR);
      this.dataChangeLogs = {
        data: [],
        dataCount: 0
      };
      return;
    }

    try {
      let req: DataChangeLogReq = {
        data: {
          app: this.selectedData.apps,
          days: this.selectedData.days
        }
      }

      if (this.selectedData.users != undefined || this.selectedData.users != null) {
        req.data.who = this.selectedData.users
      }

      if (this.selectedData.fields != undefined || this.selectedData.fields != null) {
        req.data.field = this.selectedData.fields
      }

      if (this.selectedData.entityId != undefined || this.selectedData.entityId != null) {
        req.data.instance_id = this.selectedData.entityId
      }

      if (this.selectedData.class != undefined || this.selectedData.class != null) {
        req.data.class = this.selectedData.class
      }

      if (timeStamp != undefined || timeStamp != null) {
        req.data.search_after_timestamp = timeStamp
      }

      this._commonService.showLoader();
      this._dataChangeLogService.getDataChangeLog(req).subscribe((res: DataChangeLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data.logs == null || res.data.logs.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if (!isNext) {
              this.dataChangeLogs = {
                data: [],
                dataCount: 0
              }
            }
            return;
          }

          if (!isNext) {
            this.dataChangeLogs.data = [];
          }

          res.data.logs.forEach(log => {
            if (log.data.change_data != undefined) {
              log.data.change_data.changes.forEach((change, index) => {
                log.data.change_data!.changes[index].old_value = this._commonService.parseStringValue(change.old_value);
                log.data.change_data!.changes[index].new_value = this._commonService.parseStringValue(change.new_value);
              });
            }

            this.dataChangeLogs.data.push(log);
          })

          this.dataChangeLogs.dataCount = this.dataChangeLogs.data.length;
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      }, (err: any) => {
        this._commonService.hideLoader()
        this._toastr.error(err, CONSTANTS.ERROR)
      })
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getDataChangeLogs',
        msg: error
      });
    }
  }

}
