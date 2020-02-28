import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateFormatter} from './services/dateFormatter';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ViewEventComponent} from './components/view-event/view-event.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ListCreatedEventsComponent} from './components/list-created-events/list-created-events.component';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {ViewUserComponent} from './components/view-registration/view-user.component';
import {MatInputModule} from '@angular/material/input';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

import {
    DateAdapter,
    MAT_DATE_FORMATS, MAT_DATE_LOCALE,
    MatDatepickerModule,
    MatFormFieldModule
} from '@angular/material';
import {registerLocaleData} from '@angular/common';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL hA',
        monthYearLabel: 'MMM YYYY hA',
        dateA11yLabel: 'LL hA',
        monthYearA11yLabel: 'MMMM YYYY hA',
    },
};

@NgModule({
    declarations: [
        AppComponent,
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
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule
    ],
    // tslint:disable-next-line:max-line-length
    providers: [DateFormatter,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
