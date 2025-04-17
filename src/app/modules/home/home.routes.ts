import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { loginGuard } from '../../core/auth/guard/login.guard';

export const HOME_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  // { path: 'home', component: HomeComponent },
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path: 'home',
        loadChildren: () =>
          import('./initial/initial.routes').then((m) => m.INITIAL_ROUTES),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.routes').then((m) => m.LOGIN_ROUTES),
        canMatch: [loginGuard]
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.routes').then((m) => m.REGISTER_ROUTES),
        canMatch: [loginGuard]
      },

    ]
  }
];