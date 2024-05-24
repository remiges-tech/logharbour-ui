import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private production: boolean = environment.production;;
  isLoading: boolean = false;
  constructor() { }

  log(value: any, type?: string) {
    if (!this.production) {
      if (type === 'error')
        console.error(value);
      else if (type === 'warn')
        console.warn(value);
      else
        console.log(value);
    }
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  parseStringValue(value: string) {
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

}
