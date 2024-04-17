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
  status: string,
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

export interface ActivityChangeLogs {
  when: string,
  who: string,
  app: string,
  system: string,
  module: string,
  op: string,
  type: string,
  class: string,
  instance_id: number,
  status: string,
  error: string,
  remote_ip: string,
  msg: string,
  data: ActivityChangeLogData
}

export interface ActivityChangeLogData {
  entity: string,
  op: string,
  changes: ActivityChangeLogChanges[]
}

export interface ActivityChangeLogChanges {
  field: string,
  old_value: string,
  new_value: string
}
