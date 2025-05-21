import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { AuthenticationModule } from './authentication/authentication.module'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    AuthenticationModule, 
    AppComponent,  
    HttpClientModule,
  ],
  providers: [],
})
export class AppModule { }
