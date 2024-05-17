import {
  LogEntry,
  UnusualIPs,
} from './common-interfaces';

export interface AppListResp {
  data: string[];
  status: string;
  statusCode: number;
  message: string;
}

export interface GetSetListResp {
  data: string[];
  status: string;
  statusCode: number;
  message: string;
}

export interface DataChangeLogResp {
  data: {
    logs: LogEntry[];
  };
  status: string;
  statusCode: number;
  message: string;
}

export interface HighPriLogResp {
  data: {
    logs: LogEntry[];
  };
  status: string;
  statusCode: number;
  message: string;
}

export interface ActivityLogResp {
  data: {
    LogEntery: LogEntry[];
  };
  status: string;
  statusCode: number;
  message: string;
}

export interface DebugLogResp {
  data: LogEntry[];
  status: string;
  statusCode: number;
  message: string;
}

export interface UnusualIPResp {
  data: {
    unusualIPs: UnusualIPs[];
  };
  status: string;
  statusCode: number;
  message: string;
}
