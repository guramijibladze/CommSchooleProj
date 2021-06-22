import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AuthModule } from './auth/auth.module'
import { ShellModule } from './shell/shell.module';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';


export function TranslateHttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    // Loading.ServiceComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule, 
    AuthModule,
    ShellModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'ka',
    }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
