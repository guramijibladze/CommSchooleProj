import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isEn(): boolean {
    return this.isLanguage('en');
  }

  get isKa(): boolean {
    return this.isLanguage('ka');
  }

  constructor(
    private translateService: TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  en(){
    this.translateService.use('en')
  }

  ka(){
    this.translateService.use('ka')
  }

  private isLanguage(lang: string): boolean {
    const defaultLang = this.translateService.defaultLang;
    const currentLang = this.translateService.currentLang;

    return currentLang ? currentLang === lang : defaultLang === lang;
  }
}
