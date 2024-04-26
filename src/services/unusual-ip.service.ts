import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DataChangeLogReq, UnusualIPReq } from 'src/models/request-interfaces';
import { CommonService } from './common.service';
import { HttpService } from './http.service';
import * as Enums from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class UnusualIpService {
  fileName: string = 'UnusualIpService';
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() {}

  getUnusualIP(req: UnusualIPReq): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl + Enums.CONSTANTS.UNUSUAL_IP_API,
        local_json_file: '',
        param_data: req,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getUnusualIP',
        msg: error,
      });
    }
  }
}
