import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { WelcomeComponent } from "./home/welcome.component";
import { ProductModule } from './products/product.module';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      { path: '**', pathMatch: 'full', redirectTo: 'welcome' },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
