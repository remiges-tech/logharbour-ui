import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';
import { HighPriLogReq } from 'src/models/request-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HighpriLogService {
  fileName: string = 'HighpriLogService'
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() { }

  getHighPriLog(req:HighPriLogReq): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl + Enums.CONSTANTS.HIGH_PRI_LOG_API,
        local_json_file: '',
        param_data: req,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getHighPriLog',
        msg: error
      });
    }
  }
}
