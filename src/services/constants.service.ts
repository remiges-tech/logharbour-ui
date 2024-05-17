export enum CONSTANTS {
  SUCCESS = 'success',
  FAILED = 'failed',
  ERROR = 'Error',
  WARNING = 'Warning',
  DATA_NOT_FOUND = 'Data not found!',
  GET_APPS_LIST = '/getapps',
  GET_SET_LIST = '/getset',
  DATA_CHANGE_LOG_API = '/datachange',
  ACTIVITY_LOG_API = '/activitylog',
  HIGH_PRI_LOG_API = '/highprilog',
  DEBUG_LOG_API = '/debuglog',
  UNUSUAL_IP_API = '/unusualip',
  PLEASE_WAIT_PROCESSING_YOUR_DATA = 'Please wait, processing your data',
}

export enum GETSETFIELDS {
  CLASS = 'class',
  INSTANCE = 'instance',
  FIELD = 'field',
  WHO = 'who',
  MODULE = 'module',
  PRIORITY = 'pri',
  TRACE_ID = 'trace_id'
}
