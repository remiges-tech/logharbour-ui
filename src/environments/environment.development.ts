import { timeout } from "rxjs";

export const environment = {
    production: false,
    // apiUrl: 'http://10.10.10.74:8090/api/v1'
    apiUrl: 'http://localhost:8090/api/v1',
    apiTimeout: 1000
};
