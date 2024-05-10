import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { commonLists, logData } from 'src/models/common-interfaces';
import { DebugLogReq } from 'src/models/request-interfaces';
import { DebugLogResp } from 'src/models/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS, GETSETFIELDS } from 'src/services/constants.service';
import { DebugLogService } from 'src/services/debug-log.service';
import { CommonMethodsService } from '../common-methods.service';

interface SelectedDataInterface {
  apps: string | undefined,
  module: string | undefined
  pri: string | undefined
  days: number | 0
  trace_id?: any
}

@Component({
  selector: 'app-debug-log',
  templateUrl: './debug-log.component.html',
  styleUrls: ['./debug-log.component.scss']
})
export class DebugLogComponent {
  fileName: string = 'DebugLogComponent';
  private _debugLogService = inject(DebugLogService);
  private _commonMethodService = inject(CommonMethodsService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  lists: commonLists = {
    apps: [],
    module: [],
    pri: [],
    trace_id: []
  }
  debugLogs: logData = {
    data: [],
    dataCount: 0
  };

  selectedData: SelectedDataInterface = {
    apps: undefined,
    module: undefined,
    pri: undefined,
    days: 50
  }

  ngOnInit() {
    this._commonMethodService.getAppsList(this.lists)
  }

  appChangeHandler() {
    if (this.selectedData.apps == undefined || this.selectedData.apps == null) {
      this.selectedData.module = undefined;
      this.selectedData.pri = undefined;
      this.selectedData.trace_id = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.MODULE);
  }

  moduleChangeHandler() {
    if (this.selectedData.module == undefined || this.selectedData.module == null) {
      this.selectedData.pri = undefined;
      this.selectedData.trace_id = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.PRIORITY);
  }

  // priChangeHandler() {
  //   if (this.selectedData.entityId == undefined || this.selectedData.entityId == null) {
  //     this.selectedData.fields = undefined;
  //     return;
  //   }

  //   this.getDropdownsValue('field');
  // }


  getDebugLogs(isNext: boolean = false, timestamp?: string) {
    if (this.selectedData.apps == undefined || this.selectedData.module == undefined || this.selectedData.days == undefined || this.selectedData.pri == undefined) {
      this._toastr.error('Application, Module, Priority and Days are mandatory fields.', CONSTANTS.ERROR);
      this.debugLogs = {
        data: [],
        dataCount: 0
      };
      return;
    }

    try {
      let req: DebugLogReq = {
        data: {
          app: this.selectedData.apps,
          module: this.selectedData.module,
          pri: this.selectedData.pri,
          days: this.selectedData.days
        }
      }

      if (timestamp != undefined && timestamp != null) {
        req.data.search_after_timestamp = timestamp;
      }

      this._commonService.showLoader();
      this._debugLogService.getDebugLog(req).subscribe((res: DebugLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data == null || res.data.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if (!isNext) {
              this.debugLogs = {
                data: [],
                dataCount: 0
              };
            }
            return;
          }
          if (!isNext) {
            this.debugLogs.data = [];
          }

          res.data.forEach(log => {
            this.debugLogs.data.push(log);
          })

          this.debugLogs.dataCount = this.debugLogs.data.length;
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      }, (err: any) => {
        this._commonService.hideLoader();
        this._toastr.error(err, CONSTANTS.ERROR)
      })
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getHighPriLogs',
        msg: error
      });
    }
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      module: undefined,
      pri: undefined,
      days: 50,

    }
    this.debugLogs = {
      data: [],
      dataCount: 0
    };
  }

}
