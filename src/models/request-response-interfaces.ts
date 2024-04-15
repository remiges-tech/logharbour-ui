import { DataChangeLogs } from "./common-interfaces";


export interface DataChangeLogResp{
    data: {
        logs: DataChangeLogs[]
    },
    status: string,
    statusCode: number,
    message: string
}