import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/data/product-data';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData),
    AppRoutingModule,
    UserModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
