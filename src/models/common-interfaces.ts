export interface LogEntry {
  id: string;
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
  data: logData;
}

export interface logData {
  change_data?: changeInfo;
  activity_data?: string;
  debug_data?: debugInfo;
}

export interface changeInfo{
  entity: string;
  op: string;
  changes: changeDetails[];
}

export interface changeDetails{
  field: string;
  old_value: any;
  new_value: any;
}

export interface debugInfo{
  pid: number;
  runtime: number;
  file: string;
  line: number;
  func: string;
  stackTrace: string;
  data: any;
}

export interface UnusualIPs {
  ip: string;
  position:google.maps.LatLngLiteral
}
