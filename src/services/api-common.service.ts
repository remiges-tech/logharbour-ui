import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';
import { GetSetReq } from 'src/models/request-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCommonService {
  fileName:string = 'ApiCommonService'
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);

  constructor() { }

  getAppsList(): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl + Enums.CONSTANTS.GET_APPS_LIST,
        local_json_file: '',
        param_data: {},
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getAppsList',
        msg: error
      });
    }
  }

  getSetList(req:GetSetReq): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl + Enums.CONSTANTS.GET_SET_LIST,
        local_json_file: '',
        param_data: req,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSetList',
        msg: error
      });
    }
  }
}
