import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogEntry } from 'src/models/common-interfaces';
import { DebugLogReq, GetSetReq } from 'src/models/request-interfaces';
import { AppListResp, DebugLogResp, GetSetListResp } from 'src/models/response-interfaces';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { DebugLogService } from 'src/services/debug-log.service';

interface SelectedDataInterface{
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
  private _apiCommonService = inject(ApiCommonService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  appsList?: string[]
  moduleList?: string[]
  priList?: string[]
  trace_idList?: string[]
  debugLogs:LogEntry[] = []
  dataCount:number = 0;

  selectedData:SelectedDataInterface = {
    apps: undefined,
    module: undefined,
    pri: undefined,
    days: 50
  }

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
      },(err:any) => {
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
      this.selectedData.module = undefined;
      this.selectedData.pri = undefined;
      this.selectedData.trace_id = undefined;
      return;
    }

    this.getDropdownsValue('module');
    this.getDropdownsValue('pri');
  }

  moduleChangeHandler() {
    if (this.selectedData.module == undefined || this.selectedData.module == null) {
      this.selectedData.pri = undefined;
      this.selectedData.trace_id = undefined;
      return;
    }

    this.getDropdownsValue('pri');
  }


  // priChangeHandler() {
  //   if (this.selectedData.entityId == undefined || this.selectedData.entityId == null) {
  //     this.selectedData.fields = undefined;
  //     return;
  //   }

  //   this.getDropdownsValue('field');
  // }
  
  getDropdownsValue(field: 'module' | 'pri' | 'trace_id') {
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
            case 'module': this.moduleList = res.data
              break;
            case 'pri': this.priList = res.data
              break;
            case 'trace_id': this.trace_idList = res.data
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

  getDebugLogs(isNext:boolean = false,timestamp?:string){
    if(this.selectedData.apps == undefined || this.selectedData.module == undefined || this.selectedData.days == undefined || this.selectedData.pri == undefined){
      this._toastr.error('Application, Module, Priority and Days are mandatory fields.', CONSTANTS.ERROR);
      this.debugLogs = [];
      this.dataCount = 0;
      return;
    }

    try {
      let req: DebugLogReq = {
        data:{
          app: this.selectedData.apps,
          module: this.selectedData.module,
          pri: this.selectedData.pri,
          days: this.selectedData.days,
          // search_after_timestamp: "2024-04-18T10:56:43.0427498Z"
        }
      }

      if(timestamp != undefined && timestamp != null){
        req.data.search_after_timestamp = timestamp;
      }

      this._commonService.showLoader();
      this._debugLogService.getDebugLog(req).subscribe((res:DebugLogResp) => {
        this._commonService.hideLoader();
        if(res.status == CONSTANTS.SUCCESS){
          if (res.data == null || res.data.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if(!isNext){
              this.debugLogs = []
              this.dataCount = 0
            }
            return;
          }
          if(!isNext){
            this.debugLogs = [];
          }

          res.data.forEach(log => {
            this.debugLogs.push(log);
          })

          this.dataCount = this.debugLogs.length;
        }else{
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      },(err:any) => {
        this._commonService.hideLoader();
        this._toastr.error(err,CONSTANTS.ERROR)
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
    this.debugLogs = []
    this.dataCount = 0;
  }

}
