import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogEntry, commonLists, logData } from 'src/models/common-interfaces';
import { ActivityLogReq } from 'src/models/request-interfaces';
import { ActivityLogResp } from 'src/models/response-interfaces';
import { ActivityLogService } from 'src/services/activity-log.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS, GETSETFIELDS } from 'src/services/constants.service';
import { CommonMethodsService } from '../common-methods.service';
interface SelectedDataInterface {
  apps: string | undefined,
  class?: string,
  users?: string,
  entityId?: string,
  days: number
}

@Component({
  selector: 'app-showactivity-log',
  templateUrl: './showactivity-log.component.html',
  styleUrls: ['./showactivity-log.component.scss']
})


export class ShowactivityLogComponent {
  fileName: string = 'ShowactivityLogComponent';
  private _activityLogService = inject(ActivityLogService);
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
    who: []
  }
  activityLogs: logData = {
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
      this.selectedData.users = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.CLASS);
    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.WHO);
  }

  classChangeHandler() {
    if (this.selectedData.class == undefined || this.selectedData.class == null) {
      this.selectedData.entityId = undefined;
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.INSTANCE);
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 50,
      class: undefined,
      users: undefined,
      entityId: undefined
    }

    this.activityLogs = {
      data: [],
      dataCount: 0
    };
  }

  getActivityLogs(isNext: boolean = false, timeStamp?: string) {
    if (this.selectedData.apps == undefined || this.selectedData.days == undefined) {
      this._toastr.error('Application and Days must be selected first.', CONSTANTS.ERROR);
      this.activityLogs = {
        data: [],
        dataCount: 0
      };
      return;
    }

    try {
      let req: ActivityLogReq = {
        data: {
          app: this.selectedData.apps,
          days: this.selectedData.days
        }
      }

      if (this.selectedData.users != undefined || this.selectedData.users != null) {
        req.data.who = this.selectedData.users
      }

      if (this.selectedData.entityId != undefined || this.selectedData.entityId != null) {
        req.data.instance_id = this.selectedData.entityId
      }

      if (this.selectedData.class != undefined || this.selectedData.class != null) {
        req.data.class = this.selectedData.class
      }

      if (timeStamp != undefined || timeStamp != null) {
        req.data.search_after_timestamp = timeStamp;
      }

      this._commonService.showLoader();
      this._activityLogService.getActivityLogs(req).subscribe((res: ActivityLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data.LogEntery == null || res.data.
            LogEntery.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if (!isNext) {
              this.activityLogs = {
                data: [],
                dataCount: 0
              };
            }
            return;
          }

          if (!isNext) {
            this.activityLogs.data = [];
          }

          res.data.LogEntery.forEach((entry: any) => {
            this.activityLogs.data.push(entry);
          })

          this.activityLogs.dataCount = this.activityLogs.data.length;

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
        functionName: 'getActivityLogs',
        msg: error
      });
    }
  }
}
