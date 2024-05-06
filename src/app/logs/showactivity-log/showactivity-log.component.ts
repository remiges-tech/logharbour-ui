import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityLogs } from 'src/models/common-interfaces';
import { ActivityLogReq, GetSetReq } from 'src/models/request-interfaces';
import { ActivityLogResp, AppListResp, GetSetListResp } from 'src/models/response-interfaces';
import { ActivityLogService } from 'src/services/activity-log.service';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
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
  private _apiCommonService = inject(ApiCommonService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 50
  }
  appsList?: string[]
  classList?: string[]
  entityIdList?: string[]
  usersList?: string[]
  activityLogs: ActivityLogs[] = []
  dataCount: number = 0;

  ngOnInit() {
    this.getAppsList()
  }

  getAppsList() {
    try {
      this._commonService.showLoader();
      this._apiCommonService.getAppsList().subscribe((res: AppListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data == null || res.data.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            return;
          }
          this.appsList = res.data
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      },(err:any)=>{
        this._commonService.hideLoader();
        this._toastr.error(err,CONSTANTS.ERROR)
      })
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getAppsList',
        msg: error
      });
    }
  }

  appChangeHandler() {
    if (this.selectedData.apps == undefined || this.selectedData.apps == null) {
      this.selectedData.class = undefined;
      this.selectedData.entityId = undefined;
      return;
    }

    this.getDropdownsValue('class');
    this.getDropdownsValue('who');
  }

  classChangeHandler() {
    if (this.selectedData.class == undefined || this.selectedData.class == null) {
      this.selectedData.entityId = undefined;
      return;
    }

    this.getDropdownsValue('instance');
  }

  getDropdownsValue(field: 'class' | 'instance' | 'who') {
    if (this.selectedData.apps == undefined) {
      return;
    }

    try {
      let req: GetSetReq = {
        data: {
          app: this.selectedData.apps,
          setAttr: field
        }
      }
      this._commonService.showLoader();
      this._apiCommonService.getSetList(req).subscribe((res: GetSetListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          switch (field) {
            case 'class': this.classList = res.data
              break;
            case 'instance': this.entityIdList = res.data
              break;
            case 'who': this.usersList = res.data
              break;
          }
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      },(err:any)=>{
        this._commonService.hideLoader()
        this._toastr.error(err,CONSTANTS.ERROR)
      })
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getDropdownsValue',
        msg: error
      });
    }
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 50,
      class: undefined,
      users: undefined,
      entityId: undefined
    }

    this.activityLogs = []
    this.dataCount = 0
  }

  getActivityLogs(isNext:boolean=false,timeStamp?:string) {
    if (this.selectedData.apps == undefined || this.selectedData.days == undefined) {
      this._toastr.error('Application and Days must be selected first.', CONSTANTS.ERROR);
      this.activityLogs = [];
      this.dataCount = 0;
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

      if(timeStamp != undefined || timeStamp != null){
        req.data.search_after_timestamp = timeStamp;
      }

      this._commonService.showLoader();
      this._activityLogService.getActivityLogs(req).subscribe((res: ActivityLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data.LogEntery == null || res.data.
            LogEntery.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if(!isNext){
              this.activityLogs = []
              this.dataCount = 0;
            }
            return;
          }

          if(!isNext){
            this.activityLogs = [];
          }

          res.data.LogEntery.forEach((entry:any) => {
            this.activityLogs.push(entry);
          })

          this.dataCount = this.activityLogs.length;

        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      },(err:any)=>{
        this._commonService.hideLoader()
        this._toastr.error(err,CONSTANTS.ERROR)
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
