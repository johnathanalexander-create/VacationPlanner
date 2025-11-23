import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {AuthComponent} from "./layouts/auth/auth.component";
import {ActivateAccountComponent} from "./pages/auth/activate-account/activate-account.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {ForgotPasswordComponent} from "./pages/auth/forgot-password/forgot-password.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {RolesComponent} from "./pages/admin/roles/roles.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {authGuard} from "./guards/auth/auth.guard";
import {ResetPasswordComponent} from "./pages/auth/reset-password/reset-password.component";
import { CreateNewVacationComponent } from './components/vacation/create-new-vacation/create-new-vacation.component';
/*import {NewVacationFormComponent} from "./"*/


export const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'activate-account', component: ActivateAccountComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent}
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    component: DefaultComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Dashboard',
        component: HomeComponent
      },
      {
        path: 'profile',
        title: 'User profile',
        component: ProfileComponent
      },
	  {
		path:'app-create-new-vacation',
		title:"Create New Vacation",
		component: CreateNewVacationComponent
	  },
      {
        path: 'admin', children: [
          {
            path: 'users',
            title: 'Users',
            component: UsersComponent
          },
          {
            path: 'roles',
            title: 'Roles',
            component: RolesComponent
          }
        ]
      },
    ]
  },
  {
    path: '**',
    title: 'Page not found',
    component: NotFoundComponent
  }
];
