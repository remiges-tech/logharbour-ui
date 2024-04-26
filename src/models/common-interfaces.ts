export interface DataChangeLogs {
  app: string;
  system: string;
  module: string;
  type: string;
  pri: string;
  when: string;
  who: string;
  op: string;
  class: string;
  instance: string;
  status: string;
  remote_ip: string;
  msg: string;
  data: DataChangeLogData;
}

export interface DataChangeLogData {
  entity: string;
  op: string;
  changes: DataChangeLogChanges[];
}

export interface DataChangeLogChanges {
  field: string;
  old_value: string;
  new_value: string;
}

export interface HighPriLogs {
  app: string;
  system: string;
  module: string;
  type: string;
  pri: string;
  when: string;
  who: string;
  op: string;
  class: string;
  instance: string;
  status: string;
  remote_ip: string;
  msg: string;
  data: any;
}

export interface ActivityLogs {
  app: string;
  system: string;
  module: string;
  type: string;
  pri: string;
  when: string;
  who: string;
  op: string;
  class: string;
  instance: string;
  status: number;
  remote_ip: string;
  msg: string;
  data: ActivityLogData;
}

export interface ActivityLogData {
  activitylog: string;
}

export interface DebugLogs {
  app: string;
  system: string;
  module: string;
  type: string;
  pri: string;
  when: string;
  who: string;
  op: string;
  class: string;
  instance: string;
  status: string;
  remote_ip: string;
  msg: string;
  trace_id?: any;
  data: any;
}

export interface UnusualIPs {
  ip: string;
  lat: string;
  long: string;
}
