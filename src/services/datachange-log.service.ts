import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DatachangeLogService {
  fileName: string = 'SchemaService'
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() { }

  getDataChangeLog(): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl + Enums.CONSTANTS.DATA_CHANGE_LOG_API,
        local_json_file: '',
        param_data: {},
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getDataChangeLog',
        msg: error
      });
    }
  }
}
