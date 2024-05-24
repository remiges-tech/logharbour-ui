import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';
import { DataChangeLogReq } from 'src/models/request-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DatachangeLogService {
  fileName: string = 'DatachangeLogService';
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() {}

  getDataChangeLog(req: DataChangeLogReq): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl + Enums.CONSTANTS.DATA_CHANGE_LOG_API,
        local_json_file: '',
        param_data: req,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getDataChangeLog',
        msg: error,
      });
    }
  }
}
