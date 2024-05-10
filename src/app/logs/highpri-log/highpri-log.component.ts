import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogEntry, commonLists, logData } from 'src/models/common-interfaces';
import { HighPriLogReq } from 'src/models/request-interfaces';
import { HighPriLogResp } from 'src/models/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS, GETSETFIELDS } from 'src/services/constants.service';
import { HighpriLogService } from 'src/services/highpri-log.service';
import { CommonMethodsService } from '../common-methods.service';

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
  private _commonMethodService = inject(CommonMethodsService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData:SelectedDataInterface = {
    apps: undefined,
    pri: undefined,
    days: 50
  }
  lists: commonLists = {
    apps: [],
    pri: []
  }
  highPriLogs: logData = {
    data: [],
    dataCount: 0
  };


  ngOnInit(){
    this._commonMethodService.getAppsList(this.lists)
  }

  appChangeHandler() {
    if (this.selectedData.apps == undefined || this.selectedData.apps == null) {
      return;
    }

    this._commonMethodService.getDropdownsValue(this.selectedData.apps, this.lists, GETSETFIELDS.PRIORITY);
  }

  getHighPriLogs(isNext:boolean = false,timeStamp?:string){
    if(this.selectedData.apps == undefined || this.selectedData.days == undefined || this.selectedData.pri == undefined){
      this._toastr.error('Application, Priority and Days are mandatory fields.', CONSTANTS.ERROR);
      this.highPriLogs ={
        data: [],
        dataCount: 0
      };
      return;
    }

    try {
      let req: HighPriLogReq = {
        data:{
          app: this.selectedData.apps,
          pri: this.selectedData.pri,
          days: this.selectedData.days
        }
      }

      if(timeStamp != undefined && timeStamp != null){
        req.data.search_after_timestamp = timeStamp
      }

      this._commonService.showLoader();
      this._highPriLogService.getHighPriLog(req).subscribe((res:HighPriLogResp) => {
        this._commonService.hideLoader();
        if(res.status == CONSTANTS.SUCCESS){
          if (res.data.logs == null || res.data.logs.length == 0) {
            this._toastr.error('No data Found!', CONSTANTS.ERROR);
            if(!isNext){
              this.highPriLogs = {
                data: [],
                dataCount: 0
              };
            }
            return;
          }

          if(!isNext){
            this.highPriLogs.data = []
          }
          // Parse old_value and new_value
          res.data.logs.forEach(log => {
            log.data.change_data?.changes.forEach((change:any,index:number) => {
              log.data.change_data!.changes[index].old_value = this._commonService.parseStringValue(change.old_value);
              log.data.change_data!.changes[index].new_value = this._commonService.parseStringValue(change.new_value);
            });
            this.highPriLogs.data.push(log)
          })

          this.highPriLogs.dataCount = this.highPriLogs.data.length
          // Assign updated logsvalue to the variable
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
      pri: undefined,
      days: 50,
      
    }
    this.highPriLogs = {
      data: [],
      dataCount: 0
    };
  }
}
