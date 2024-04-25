import { ActivityLogs, DataChangeLogs, DebugLogs, HighPriLogs } from "./common-interfaces";

export interface AppListResp{
    data: string[],
    status: string,
    statusCode: number,
    message: string
}

export interface GetSetListResp{
    data: string[],
    status: string,
    statusCode: number,
    message: string
}

export interface DataChangeLogResp{
    data: {
        logs: DataChangeLogs[]
    },
    status: string,
    statusCode: number,
    message: string
}

export interface HighPriLogResp{
    data: {
        logs: HighPriLogs[]
    },
    status: string,
    statusCode: number,
    message: string
}

export interface ActivityLogResp{
    data: {
        LogEntery: ActivityLogs[]
    },
    status: string,
    statusCode: number,
    message: string
}

export interface DebugLogResp{
    data: DebugLogs[],
    status: string,
    statusCode: number,
    message: string
}