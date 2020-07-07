import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ProductListComponent } from "./products/product-list.component";
import { ConvertToSpacesPipe } from "./shared/convert-to-spaces.pipe";
import { StarComponent } from "./shared/star.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from "./home/welcome.component";
import { ProductDetailGuard } from "./products/product-detail.guard";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard] , component: ProductDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      { path: '**', pathMatch: 'full', redirectTo: 'welcome' },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
