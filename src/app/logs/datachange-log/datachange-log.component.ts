import { Component, inject } from '@angular/core';
import { DataChangeLogs } from 'src/models/common-interfaces';
import { DataChangeLogResp } from 'src/models/request-response-interfaces';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
import { DatachangeLogService } from 'src/services/datachange-log.service';

@Component({
  selector: 'app-datachange-log',
  templateUrl: './datachange-log.component.html',
  styleUrls: ['./datachange-log.component.scss']
})
export class DatachangeLogComponent {
  fileName: string = 'DatachangeLogComponent';
  private _dataChangeLogService = inject(DatachangeLogService);
  private _commonService = inject(CommonService);
  dataChangeLogs?: DataChangeLogs[];

}
