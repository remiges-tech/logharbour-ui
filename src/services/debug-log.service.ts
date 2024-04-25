import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { CommonService } from './common.service';
import * as Enums from './constants.service';
import { DebugLogReq } from 'src/models/request-interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DebugLogService {
  fileName: string = 'DebugLogService'
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() { }

  getDebugLog(req:DebugLogReq): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl + Enums.CONSTANTS.DEBUG_LOG_API,
        local_json_file: '',
        param_data: req,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getDebugLog',
        msg: error
      });
    }
  }
}
