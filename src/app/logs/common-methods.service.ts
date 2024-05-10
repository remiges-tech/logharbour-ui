import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { commonLists } from 'src/models/common-interfaces';
import { GetSetReq } from 'src/models/request-interfaces';
import { AppListResp, GetSetListResp } from 'src/models/response-interfaces';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS, GETSETFIELDS } from 'src/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {
  fileName: string = 'CommonMethodsService'
  private _commonService = inject(CommonService)
  private _apiCommonService = inject(ApiCommonService)
  private _toastr = inject(ToastrService);

  constructor() { }

  getAppsList(lists: commonLists) {
    try {
      this._commonService.showLoader();
      this._apiCommonService.getApps().subscribe((res: AppListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          if (res.data == null || res.data.length == 0) {
            this._toastr.error("No Applicatios found!", CONSTANTS.ERROR);
            return;
          }
          lists['apps'] = res.data
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      }, (err: any) => {
        this._commonService.hideLoader()
        this._toastr.error(err, CONSTANTS.ERROR)
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

  getDropdownsValue(apps: string | undefined, lists: commonLists, field: GETSETFIELDS) {
    if (apps == undefined) {
      return;
    }

    try {
      let req: GetSetReq = {
        data: {
          app: apps,
          setAttr: field
        }
      }
      this._commonService.showLoader();
      this._apiCommonService.getSetList(req).subscribe((res: GetSetListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          lists[field] = res.data;
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      }, (err: any) => {
        this._commonService.hideLoader()
        this._toastr.error(err, CONSTANTS.ERROR)
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
}
