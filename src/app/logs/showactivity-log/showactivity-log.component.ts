import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityLogs } from 'src/models/common-interfaces';
import { ActivityLogReq, GetSetReq } from 'src/models/request-interfaces';
import { ActivityLogResp, AppListResp, GetSetListResp } from 'src/models/response-interfaces';
import { ActivityLogService } from 'src/services/activity-log.service';
import { ApiCommonService } from 'src/services/api-common.service';
import { CommonService } from 'src/services/common.service';
import { CONSTANTS } from 'src/services/constants.service';
interface SelectedDataInterface {
  apps: string | undefined,
  class?: string | undefined,
  users?: string | undefined,
  entityId?: string | undefined,
  days: number | 0
}

@Component({
  selector: 'app-showactivity-log',
  templateUrl: './showactivity-log.component.html',
  styleUrls: ['./showactivity-log.component.scss']
})


export class ShowactivityLogComponent {
  fileName: string = 'ShowactivityLogComponent';
  private _activityLogService = inject(ActivityLogService);
  private _apiCommonService = inject(ApiCommonService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  selectedData: SelectedDataInterface = {
    apps: undefined,
    days: 5
  }
  appsList?: string[]
  classList?: string[]
  entityIdList?: string[]
  usersList?: string[]
  activityLogs?: ActivityLogs[]
  showFilters: boolean = false;

  // data: ActivityChangeLogs[] = [{
  //   when: "2024-04-15T05:40:38.6600928Z",
  //   who: "jim",
  //   app: "OnlineStore",
  //   system: "server1",
  //   module: "Orders",
  //   op: "Update",
  //   type: "A",
  //   class: "Order",
  //   instance_id: 456,
  //   status: "Success",
  //   error: "server-error",
  //   remote_ip: "203.0.113.45",
  //   msg: "Order updated successfully",
  //   data: {
  //     entity: "ruleset",
  //     op: "Update",
  //     changes: [
  //       {
  //         field: "brwf",
  //         old_value: this.getTypeOfValue("W"),
  //         new_value: this.getTypeOfValue("W")
  //       },
  //       {
  //         field: "setname",
  //         old_value: this.getTypeOfValue("ucc_user_cr"),
  //         new_value: this.getTypeOfValue("ucc_user_cr")
  //       },
  //       {
  //         field: "ruleset",
  //         old_value: this.getTypeOfValue("[{\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"getcustdetails\"], \"properties\": {\"nextstep\": \"getcustdetails\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"start\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"aof\", \"dpandbankaccvalid\", \"kycvalid\", \"nomauth\"], \"properties\": {\"nextstep\": \"aof\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"aof\", \"kycvalid\", \"nomauth\", \"bankaccvalid\"], \"properties\": {\"nextstep\": \"aof\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"physical\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"physical\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"kycvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"kycvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"dpandbankvalidation\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"dpandbankvalidation\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"bankaccvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"bankaccvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"nomauth\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"nomauth\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"aof\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"aof\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"sendauthlinktoclient\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"sendauthlinktoclient\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}]"),
  //         new_value: this.getTypeOfValue("[\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"start\"\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"getcustdetails\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"getcustdetails\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"aof\",\n        \"dpandbankaccvalid\",\n        \"kycvalid\",\n        \"nomauth\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"aof\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"aof\",\n        \"kycvalid\",\n        \"nomauth\",\n        \"bankaccvalid\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"aof\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"kycvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"kycvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"dpandbankvalidation\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"dpandbankvalidation\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"bankaccvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"bankaccvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"nomauth\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"nomauth\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"aof\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"aof\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"sendauthlinktoclient\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"sendauthlinktoclient\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  }\n]")
  //       }
  //     ]
  //   }
  // }, {
  //   when: "2024-04-15T05:40:38.6600928Z",
  //   who: "jim",
  //   app: "OnlineStore",
  //   system: "server1",
  //   module: "Orders",
  //   op: "Update",
  //   type: "A",
  //   class: "Order",
  //   instance_id: 456,
  //   status: "Success",
  //   error: "server-error",
  //   remote_ip: "203.0.113.45",
  //   msg: "Order updated successfully",
  //   data: {
  //     entity: "ruleset",
  //     op: "Update",
  //     changes: [
  //       {
  //         field: "brwf",
  //         old_value: this.getTypeOfValue("W"),
  //         new_value: this.getTypeOfValue("W")
  //       },
  //       {
  //         field: "setname",
  //         old_value: this.getTypeOfValue("ucc_user_cr"),
  //         new_value: this.getTypeOfValue("ucc_user_cr")
  //       },
  //       {
  //         field: "ruleset",
  //         old_value: this.getTypeOfValue("[{\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"getcustdetails\"], \"properties\": {\"nextstep\": \"getcustdetails\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"start\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"aof\", \"dpandbankaccvalid\", \"kycvalid\", \"nomauth\"], \"properties\": {\"nextstep\": \"aof\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"aof\", \"kycvalid\", \"nomauth\", \"bankaccvalid\"], \"properties\": {\"nextstep\": \"aof\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"physical\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"getcustdetails\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"physical\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"kycvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"kycvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"dpandbankvalidation\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"dpandbankvalidation\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"bankaccvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"bankaccvalid\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"nomauth\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"nomauth\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [\"sendauthlinktoclient\"], \"properties\": {\"nextstep\": \"sendauthlinktoclient\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"aof\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"aof\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"sendauthlinktoclient\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": false, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}, {\"NFailed\": 0, \"NMatched\": 0, \"ruleactions\": {\"tasks\": [], \"properties\": {\"done\": \"true\"}}, \"rulepattern\": [{\"op\": \"eq\", \"val\": \"sendauthlinktoclient\", \"attr\": \"step\"}, {\"op\": \"eq\", \"val\": true, \"attr\": \"stepfailed\"}, {\"op\": \"eq\", \"val\": \"demat\", \"attr\": \"mode\"}]}]"),
  //         new_value: this.getTypeOfValue("[\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"start\"\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"getcustdetails\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"getcustdetails\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"aof\",\n        \"dpandbankaccvalid\",\n        \"kycvalid\",\n        \"nomauth\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"aof\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"aof\",\n        \"kycvalid\",\n        \"nomauth\",\n        \"bankaccvalid\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"aof\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"getcustdetails\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"physical\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"kycvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"kycvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"dpandbankvalidation\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"dpandbankvalidation\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"bankaccvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"bankaccvalid\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"nomauth\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"nomauth\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"aof\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [\n        \"sendauthlinktoclient\"\n      ],\n      \"properties\": {\n        \"nextstep\": \"sendauthlinktoclient\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"aof\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"sendauthlinktoclient\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": false\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  },\n  {\n    \"rulepattern\": [\n      {\n        \"attr\": \"step\",\n        \"op\": \"eq\",\n        \"val\": \"sendauthlinktoclient\"\n      },\n      {\n        \"attr\": \"stepfailed\",\n        \"op\": \"eq\",\n        \"val\": true\n      },\n      {\n        \"attr\": \"mode\",\n        \"op\": \"eq\",\n        \"val\": \"demat\"\n      }\n    ],\n    \"ruleactions\": {\n      \"tasks\": [],\n      \"properties\": {\n        \"done\": \"true\"\n      }\n    },\n    \"NMatched\": 0,\n    \"NFailed\": 0\n  }\n]")
  //       }
  //     ]
  //   }
  // }]


  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  ngOnInit() {
    this.getAppsList()
  }

  getAppsList() {
    try {
      this._commonService.showLoader();
      this._apiCommonService.getAppsList().subscribe((res: AppListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          this.appsList = res.data
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
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

  getDropdownsValue(field: 'class' | 'instance' | 'who') {
    if (this.selectedData.apps == undefined) {
      return;
    }

    try {
      let req: GetSetReq = {
        data: {
          app: this.selectedData.apps,
          setAttr: field
        }
      }
      this._commonService.showLoader();
      this._apiCommonService.getSetList(req).subscribe((res: GetSetListResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          switch (field) {
            case 'class': this.classList = res.data
              break;
            case 'instance': this.entityIdList = res.data
              break;
            case 'who': this.usersList = res.data
              break;
          }
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
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

  resetHandler() {
    this.selectedData = {
      apps: undefined,
      days: 5,
      class: undefined,
      users: undefined,
      entityId: undefined
    }

    this.activityLogs = []
  }

  getActivityLogs() {
    if (this.selectedData.apps == undefined || this.selectedData.days == undefined) {
      // toast to display appropriate msg
      return;
    }

    try {
      let req: ActivityLogReq = {
        data: {
          app: this.selectedData.apps,
          days: this.selectedData.days
        }
      }

      if (this.selectedData.users != undefined || this.selectedData.users != null) {
        req.data.who = this.selectedData.users
      }

      if (this.selectedData.entityId != undefined || this.selectedData.entityId != null) {
        req.data.instance_id = this.selectedData.entityId
      }

      if (this.selectedData.class != undefined || this.selectedData.class != null) {
        req.data.class = this.selectedData.class
      }

      this._commonService.showLoader();
      this._activityLogService.getActivityLogs(req).subscribe((res: ActivityLogResp) => {
        this._commonService.hideLoader();
        if (res.status == CONSTANTS.SUCCESS) {
          this.activityLogs = res.data.LogEntery
        } else {
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      })

    } catch (error) {
      this._commonService.hideLoader();
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getActivityLogs',
        msg: error
      });
    }
  }
}
