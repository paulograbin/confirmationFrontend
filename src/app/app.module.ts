import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule} from 'ngx-bootstrap/accordion';


import {DateFormatter} from './services/dateFormatter';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {BikeService} from './services/bike.service';
import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {ViewUserComponent} from './components/view-registration/view-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ViewEventComponent} from './components/view-event/view-event.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ListCreatedEventsComponent} from './components/list-created-events/list-created-events.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        HomeComponent,
        ViewUserComponent,
        ListUsersComponent,
        ListEventsComponent,
        HeaderComponent,
        FooterComponent,
        ViewEventComponent,
        LoginComponent,
        LogoutComponent,
        ListCreatedEventsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    // tslint:disable-next-line:max-line-length
    providers: [DateFormatter, BikeService, AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
    bootstrap: [AppComponent],
    exports: [AccordionModule]
})
export class AppModule {
}
