import { DataChangeLogs } from "./common-interfaces";

export interface GetSetReq{
    data: {
        app: string,
        setAttr: string
    }
}

export interface DataChangeLogReq{
    data: {
        app: string,
        who?: string,
        class?: string,
        instance_id?: string,
        field?: string,
        days: number
    }
}

export interface ActivityLogReq{
    data: {
        app: string;
        who?: string;
        class?: string;
        instance_id?: string;
        priority?: string;
        days: number;
        search_after_timestamp?: string;
        search_after_doc_id?: string;
        sort_id?: number;
    }
}