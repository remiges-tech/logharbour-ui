import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  isDarkTheme:any;


  constructor() {}

  ngOnInit(){
    this.currentTheme();
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
