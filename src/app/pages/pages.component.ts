import { Component, OnInit } from '@angular/core';

// @ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    
    customInitFunctions();

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css' ;
    this.linkTheme?.setAttribute('href', url);
  
  }

}
