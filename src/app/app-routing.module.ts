import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ViewUserComponent} from './components/view-registration/view-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';
import {ViewEventComponent} from './components/view-event/view-event.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/guards/auth.guard';
import {LogoutComponent} from './logout/logout.component';
import {ListCreatedEventsComponent} from './components/list-created-events/list-created-events.component';
import {LoggedUserResolverService} from './services/resolvers/logged-user-resolver.service';
import {EventResolver} from './services/resolvers/event-resolver';
import {EventRouterComponent} from './event-router/event-router.component';
import {MeusdadosComponent} from './components/meusdados/meusdados.component';
import {AdminpanelComponent} from './components/adminpanel/adminpanel.component';
import {ViewChapterComponent} from './components/view-chapter/view-chapter.component';
import {ChapterResolver} from './services/resolvers/chapter-resolver';
import {AdminGuard} from './services/guards/admin.guard';
import {UserResolver} from './services/resolvers/user-resolver';
import {MeuscapituloComponent} from './components/meucapitulo/meucapitulo.component';
import {MyChapterResolverService} from './services/resolvers/my-chapter-resolver.service';
import {UserRequestComponent} from './components/userrequest/user-request.component';
import {UserRequestResolverService} from './services/resolvers/userrequest-resolver.service';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {FeatureFlagResolver} from './services/resolvers/feature-flag-resolver';
import {DefineNewPasswordComponent} from './components/define-new-password/define-new-password.component';
import {PasswordRequestResolverService} from './services/resolvers/password-request-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: EventRouterComponent,
        canActivate: [AuthGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'events',
        component: ListEventsComponent,
        canActivate: [AuthGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
        resolve: {
            features: FeatureFlagResolver,
        }
    },
    {
        path: 'forgotpassword/:passwordRequestCode',
        component: DefineNewPasswordComponent,
        resolve: {
            passwordRequestRequest: PasswordRequestResolverService,
        }
    },
    {
        path: 'capitulo',
        component: MeuscapituloComponent,
        canActivate: [AuthGuard],
        resolve: {
            resolvedChapter: MyChapterResolverService,
        }
    },
    {
        path: 'createdEvents',
        component: ListCreatedEventsComponent,
        canActivate: [AuthGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        resolve: {
            features: FeatureFlagResolver,
        }
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'panel',
        component: AdminpanelComponent,
        canActivate: [AdminGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'meusdados',
        component: MeusdadosComponent,
        canActivate: [AuthGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'user/view/:id',
        component: ViewUserComponent,
        canActivate: [AdminGuard],
        resolve: {
            resolvedUser: UserResolver,
        }
    },
    {
        path: 'event/view/:id',
        component: ViewEventComponent,
        canActivate: [AuthGuard],
        resolve: {
            response: EventResolver,
            loggedUser: LoggedUserResolverService
        }
    },
    {
        path: 'chapter/view/:id',
        component: ViewChapterComponent,
        canActivate: [AdminGuard],
        resolve: {
            resolvedChapter: ChapterResolver,
        }
    },
    {
        path: 'request/:requestNumber',
        component: UserRequestComponent,
        // canActivate: [AdminGuard],
        resolve: {
            resolvedRequest: UserRequestResolverService,
        }
    },
    {
        path: 'users',
        component: ListUsersComponent,
        canActivate: [AuthGuard],
        resolve: {
            loggedUser: LoggedUserResolverService
        }
    }
];

// TODO: don't user access events created by other MC

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
