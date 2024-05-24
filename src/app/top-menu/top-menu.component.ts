import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

interface Locale {
  localeCode: string;
  label: string;
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  isDarkTheme:any;
  selectedLocale: string = this.locale;

  locales: Locale[] = [
    { localeCode: "en-US", label: "English" },
    { localeCode: "hi", label: "Hindi" },
    { localeCode: "mr", label: "Marathi" },
  ];

  constructor(@Inject(LOCALE_ID) public locale: string, private _router: Router) {}

  ngOnInit(){
    this.currentTheme();
  }

  navigateToLocale(localeCode: string): void {
    this.selectedLocale = this.locale;
    const url = `/${localeCode}/#/${this._router.url}`; 
    window.location.href = url;  // Change the window location directly
  }
  
  currentTheme(){
    let currentTheme = localStorage.getItem('THEME') || 'light';
    this.isDarkTheme = currentTheme == 'dark';
    document.documentElement.setAttribute('data-theme',currentTheme)
  }
  
  changeTheme(){
    let theme = localStorage.getItem('THEME') || 'light';
    if(theme == 'dark'){
      this.isDarkTheme = false;
      localStorage.setItem('THEME','light')
      document.documentElement.setAttribute('data-theme','light')
    }else{
      this.isDarkTheme = true;
      localStorage.setItem('THEME','dark')
      document.documentElement.setAttribute('data-theme','dark')
    }
  }
}
