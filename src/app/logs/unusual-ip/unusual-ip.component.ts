import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UnusualIPs, commonLists } from 'src/models/common-interfaces';
import { UnusualIPResp } from 'src/models/response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { UnusualIpService } from 'src/services/unusual-ip.service';
import { CommonMethodsService } from '../common-methods.service';
import { UnusualIPReq } from 'src/models/request-interfaces';

interface SelectedDataInterface {
  apps: string | undefined;
  days: number;
  ipPercentage: number
}
@Component({
  selector: 'app-unusual-ip',
  templateUrl: './unusual-ip.component.html',
  styleUrls: ['./unusual-ip.component.scss'],
})
export class UnusualIpComponent {
  fileName = 'UnusualIpComponent';
  private _commonMethodService = inject(CommonMethodsService);
  private _unusualIPService = inject(UnusualIpService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 50,
    ipPercentage: 1
  };
  lists:commonLists = {
    apps: []
  }
  selectedIP: UnusualIPs | null = null;
  unusualIPs?: UnusualIPs[];
  // unusualIPs: UnusualIPs[] = [
  //   {
  //     ip: "8.134.222.108",
  //     position: {
  //       lat: 12.9716,
  //       lng: 77.5946
  //     }
  //   },
  //   {
  //     ip: "27.90.205.22",
  //     position: {
  //       lat: 19.0760,
  //       lng: 72.8777
  //     }
  //   },
  //   {
  //     ip: "37.103.251.121",
  //     position: {
  //       lat: 28.7041,
  //       lng: 77.1025
  //     }
  //   },
  //   {
  //     ip: "25.137.210.130",
  //     position: {
  //       lat: 23.0225,
  //       lng: 72.5714
  //     }
  //   },
  //   {
  //     ip: "24.134.40.154",
  //     position: {
  //       lat: 18.5204,
  //       lng: 73.8567
  //     }
  //   },
  //   {
  //     ip: "33.219.204.154",
  //     position: {
  //       lat: 17.3850,
  //       lng: 78.4867
  //     }
  //   }
  // ];
  
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 10;

  ngOnInit() {
    this._commonMethodService.getAppsList(this.lists);
  }

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 50,
      ipPercentage: 1
    };

    this.unusualIPs = [];
  }

  getUnusualIPs() {
    if (
      this.selectedData.apps == undefined ||
      this.selectedData.days == undefined
    ) {
      this._toastr.error(
        'Application, Days and unusual percentage are mandatory fields.',
        CONSTANTS.ERROR
      );
      // this.unusualIPs = undefined;
      return;
    }

    try {
      let req: UnusualIPReq = {
        data: {
          app: this.selectedData.apps,
          days: this.selectedData.days,
          unusualPercent: this.selectedData.ipPercentage,
        },
      };

      this._commonService.showLoader();
      this.unusualIPs = [];
      this._unusualIPService.getUnusualIP(req).subscribe(
        (res: UnusualIPResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            if (res.data == null || res.data.unusualIPs.length == 0) {
              this._toastr.error('No data Found!', CONSTANTS.ERROR);
              this.unusualIPs = undefined;
              return;
            }

            this.unusualIPs = res.data.unusualIPs;
          } else {
            this._toastr.error(res?.message, CONSTANTS.ERROR);
          }
        },
        (err: any) => {
          this._commonService.hideLoader();
          this._toastr.error(err,CONSTANTS.ERROR)
        }
      );
    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getUnusualIPs',
        msg: error,
      });
    }
  }


  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  toggleMap(ip: UnusualIPs): void {
    this.selectedIP = this.selectedIP === ip ? null : ip;
  }

}
