import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HighPriLogs } from 'src/models/common-interfaces';
import { GetSetReq, HighPriLogReq } from 'src/models/request-interfaces';
import { AppListResp, GetSetListResp, HighPriLogResp } from 'src/models/response-interfaces';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { HighpriLogService } from 'src/services/highpri-log.service';

interface SelectedDataInterface{
  apps: string | undefined,
  pri: string | undefined
  days: number | 0
}

@Component({
  selector: 'app-highpri-log',
  templateUrl: './highpri-log.component.html',
  styleUrls: ['./highpri-log.component.scss']
})
export class HighpriLogComponent {
  fileName: string = 'HighpriLogComponent';
  private _highPriLogService = inject(HighpriLogService);
  private _apiCommonService = inject(ApiCommonService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData:SelectedDataInterface = {
    apps: undefined,
    pri: undefined,
    days: 50
  }
  appsList?: string[]
  priList?: string[]
  highPriLogs?: HighPriLogs[]


  ngOnInit(){
    this.getAppsList()
  }


  getAppsList(){
    try {
      this._commonService.showLoader();
      this._apiCommonService.getAppsList().subscribe((res:AppListResp) => {
        this._commonService.hideLoader();
        if(res.status == CONSTANTS.SUCCESS){
          this.appsList = res.data
        }else{
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
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

  getDropdownsValue(field: 'pri' ){
    if(this.selectedData.apps == undefined){
      return;
    }
    try {
      let req:GetSetReq = {
        data:{
          app: this.selectedData.apps,
          setAttr: field
        }
      }
      this._commonService.showLoader();
      this._apiCommonService.getSetList(req).subscribe((res:GetSetListResp) => {
        this._commonService.hideLoader();
        if(res.status == CONSTANTS.SUCCESS){
          switch(field){
            case 'pri' : this.priList = res.data
            break;
          }
        }else{
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
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

  getHighPriLogs(){
    if(this.selectedData.apps == undefined || this.selectedData.days == undefined || this.selectedData.pri == undefined){
      this._toastr.error('Application, Priority and Days are mandatory fields.', CONSTANTS.ERROR);
      this.highPriLogs = undefined;
      return;
    }

    try {
      let req: HighPriLogReq = {
        data:{
          app: this.selectedData.apps,
          pri: this.selectedData.pri,
          days: this.selectedData.days,
          // search_after_timestamp: "2024-04-18T10:56:43.0427498Z"
        }
      }

      this._commonService.showLoader();
      this._highPriLogService.getHighPriLog(req).subscribe((res:HighPriLogResp) => {
        this._commonService.hideLoader();
        if(res.status == CONSTANTS.SUCCESS){
          if (res.data.logs == null || res.data.logs.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            this.highPriLogs = undefined
            return;
          }
          // Parse old_value and new_value
          res.data.logs.forEach(log => {
            log.data.changes?.forEach((change:any,index:number) => {
              log.data.changes[index].old_value = this._commonService.parseStringValue(change.old_value);
              log.data.changes[index].new_value = this._commonService.parseStringValue(change.new_value);
            }); 
          })
          // Assign updated logsvalue to the variable
          this.highPriLogs = res.data.logs
        }else{
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
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
      pri: undefined,
      days: 50,
      
    }
    this.highPriLogs = []
  }
}
