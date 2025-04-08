import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { AuthenticationModule } from './authentication/authentication.module'; 

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    AuthenticationModule, 
    AppComponent,  
  ],
  providers: [],
})
export class AppModule { }
