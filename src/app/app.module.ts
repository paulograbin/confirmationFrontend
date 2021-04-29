import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/guards/auth.guard';
import {AdminGuard} from './services/guards/admin.guard';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

// todo udpate angular https://www.infoq.com/news/2020/02/angular-9-ivy-rendering-engine/
//  ?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=global

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {registerLocaleData} from '@angular/common';
import {EventRouterComponent} from './event-router/event-router.component';
import {MeusdadosComponent} from './components/meusdados/meusdados.component';
import {MeuscapituloComponent} from './components/meucapitulo/meucapitulo.component';
import {AdminpanelComponent} from './components/adminpanel/adminpanel.component';
import {ViewChapterComponent} from './components/view-chapter/view-chapter.component';
import {MatSelectModule} from '@angular/material/select';
import {UserRequestComponent} from './components/userrequest/user-request.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

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
        ListCreatedEventsComponent,
        EventRouterComponent,
        MeusdadosComponent,
        MeuscapituloComponent,
        AdminpanelComponent,
        ViewChapterComponent,
        UserRequestComponent,
        ForgotPasswordComponent
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
        MatFormFieldModule,
        MatCheckboxModule,
        MatCardModule,
        MatSnackBarModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatProgressBarModule
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        AuthService, AuthGuard, AdminGuard, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
