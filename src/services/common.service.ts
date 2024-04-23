import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private production: boolean = false;
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

}
