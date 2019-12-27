import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CallbackComponent } from './components/callback/callback.component';


import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { BikeService } from './services/bike.service';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './components/view-registration/view-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import {HttpInterceptorService} from './services/http-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    AdminComponent,
    HomeComponent,
    ViewUserComponent,
    ListUsersComponent,
    ListEventsComponent,
    HeaderComponent,
    FooterComponent,
    ViewEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [BikeService, AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  exports: [AccordionModule]
})
export class AppModule { }
