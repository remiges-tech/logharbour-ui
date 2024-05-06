export interface GetSetReq {
  data: {
    app: string;
    setAttr: string;
  };
}

export interface DataChangeLogReq {
  data: {
    app: string;
    who?: string;
    class?: string;
    instance_id?: string;
    field?: string;
    days: number;
    search_after_timestamp?: string
    search_after_doc_id?: string
  };
}

export interface HighPriLogReq {
  data: {
    app: string;
    pri: string;
    days: number;
    search_after_timestamp?: string;
    search_after_doc_id?: string
  };
}

export interface DebugLogReq {
  data: {
    app: string;
    module: string;
    pri: string;
    days: number;
    trace_id?: string;
    search_after_timestamp?: string;
    search_after_doc_id?: string
  };
}

export interface ActivityLogReq {
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
  };
}

export interface UnusualIPReq {
  data: {
    app: string;
    days: number;
    unusualPercent: number;
  };
}
