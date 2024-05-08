
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogEntry } from 'src/models/common-interfaces';
import { DataChangeLogReq, GetSetReq } from 'src/models/request-interfaces';
import { AppListResp, DataChangeLogResp, GetSetListResp } from 'src/models/response-interfaces';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { DatachangeLogService } from 'src/services/datachange-log.service';

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
  private _apiCommonService = inject(ApiCommonService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 50
  }
  appsList?: string[]
  classList?: string[]
  fieldList?: string[]
  entityIdList?: string[]
  usersList?: string[]
  dataChangeLogs: LogEntry[] = [];
  count:number = 0;


  ngOnInit() { 
    this.getAppsList()
  }

  getAppsList() {
    try {
      this._commonService.showLoader();
      this._apiCommonService.getAppsList().subscribe((res: AppListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if(res.data == null || res.data.length == 0){
          this._toastr.error("No Applicatios found!", CONSTANTS.ERROR);
          return;
          }
          this.appsList = res.data
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
        functionName: 'getAppsList',
        msg: error
      });
    }
  }

  appChangeHandler() {
    if (this.selectedData.apps == undefined || this.selectedData.apps == null) {
      this.selectedData.class = undefined;
      this.selectedData.entityId = undefined;
      this.selectedData.fields = undefined;
      return;
    }

    this.getDropdownsValue('class');
    this.getDropdownsValue('who');
  }

  classChangeHandler() {
    if (this.selectedData.class == undefined || this.selectedData.class == null) {
      this.selectedData.entityId = undefined;
      this.selectedData.fields = undefined;
      return;
    }

    this.getDropdownsValue('instance');
  }

  entityChangeHandler() {
    if (this.selectedData.entityId == undefined || this.selectedData.entityId == null) {
      this.selectedData.fields = undefined;
      return;
    }

    this.getDropdownsValue('field');
  }
  
  getDropdownsValue(field: 'class' | 'instance' | 'field' | 'who') {
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
            case 'field': this.fieldList = res.data
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
      fields: undefined,
      users: undefined,
      entityId: undefined
    }

    this.dataChangeLogs = [];
    this.count = 0;
  }

  getDataChangeLogs(isNext:boolean = false,timeStamp?:string) {
    if (this.selectedData.apps == undefined || this.selectedData.days == undefined) {
      this._toastr.error('Application and Days must be selected first.', CONSTANTS.ERROR);
      this.dataChangeLogs = [];
      this.count = 0;
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

      if(timeStamp != undefined || timeStamp != null){
        req.data.search_after_timestamp = timeStamp
      }

      this._commonService.showLoader();
      this._dataChangeLogService.getDataChangeLog(req).subscribe((res: DataChangeLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data.logs == null || res.data.logs.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if(!isNext){
              this.dataChangeLogs = []
              this.count = 0;
            }
            return;
          }

          if(!isNext){
            this.dataChangeLogs = [];
          }

          res.data.logs.forEach(log => {
            if(log.data.change_data != undefined){
              log.data.change_data.changes.forEach((change, index) => {
                log.data.change_data!.changes[index].old_value = this._commonService.parseStringValue(change.old_value);
                log.data.change_data!.changes[index].new_value = this._commonService.parseStringValue(change.new_value);
              });
            }

            this.dataChangeLogs.push(log);
          })

          this.count = this.dataChangeLogs.length;
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
        functionName: 'getDataChangeLogs',
        msg: error
      });
    }
  }

}
