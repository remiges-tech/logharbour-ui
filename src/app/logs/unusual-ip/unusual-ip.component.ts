import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UnusualIPReq } from 'src/models/request-interfaces';
import { AppListResp, UnusualIPResp } from 'src/models/response-interfaces';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { UnusualIpService } from 'src/services/unusual-ip.service';

interface SelectedDataInterface {
  apps: string | undefined;
  days: number;
}
@Component({
  selector: 'app-unusual-ip',
  templateUrl: './unusual-ip.component.html',
  styleUrls: ['./unusual-ip.component.scss'],
})
export class UnusualIpComponent {
  fileName = 'UnusualIpComponent';
  private _apiCommonService = inject(ApiCommonService);
  private _unusualIPService = inject(UnusualIpService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 50,
  };
  appsList?: string[];
  unusualIPs?: string[];

  ngOnInit() {
    this.getAppsList();
  }

  getAppsList() {
    try {
      this._commonService.showLoader();
      this._apiCommonService.getAppsList().subscribe(
        (res: AppListResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            if (res.data == null || res.data.length == 0) {
              this._toastr.error('No Applicatios found!', CONSTANTS.ERROR);
              return;
            }
            this.appsList = res.data;
          } else {
            this._toastr.error(res?.message, CONSTANTS.ERROR);
          }
        },
        (err: any) => {
          this._commonService.hideLoader();
        }
      );
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getAppsList',
        msg: error,
      });
    }
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 50,
    };

    this.unusualIPs = [];
  }

  getUnusualIPs() {
    if (
      this.selectedData.apps == undefined ||
      this.selectedData.days == undefined
    ) {
      this._toastr.error(
        'Application and Days are mandatory fields.',
        CONSTANTS.ERROR
      );
      this.unusualIPs = undefined;
      return;
    }

    try {
      let req: UnusualIPReq = {
        data: {
          app: this.selectedData.apps,
          days: this.selectedData.days,
          unusualPercent: 18,
        },
      };

      this._commonService.showLoader();
      this._unusualIPService.getUnusualIP(req).subscribe(
        (res: UnusualIPResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            // IF no unusual IP is there then data should come as a empty array.
            if (res.data == null || res.data.length == 0) {
              this._toastr.error('No data Found!', CONSTANTS.ERROR);
              this.unusualIPs = undefined;
              return;
            }

            this.unusualIPs = res.data;
          } else {
            this._toastr.error(res?.message, CONSTANTS.ERROR);
          }
        },
        (err: any) => {
          this._commonService.hideLoader();
        }
      );
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getHighPriLogs',
        msg: error,
      });
    }
  }
}
