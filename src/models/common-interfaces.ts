export interface DataChangeLogs {
    app: string,
    system: string,
    module: string,
    type: string,
    pri: string,
    when: string,
    who: string,
    op: string,
    class: string,
    instance: string,
    status: number,
    remote_ip: string,
    msg: string,
    data: DataChangeLogData
  }

  export interface DataChangeLogData {
    entity: string,
    op: string,
    changes: DataChangeLogChanges[]
  }

  export interface DataChangeLogChanges {
    field: string,
    old_value: string,
    new_value: string
  }