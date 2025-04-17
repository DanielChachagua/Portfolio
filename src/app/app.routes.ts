import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guard/auth.guard';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () =>
        import('./modules/home/home.routes').then((m) => m.HOME_ROUTES),
      // canMatch: [loginGuard]
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./modules/admin/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      // canMatch: [authGuard],
    },
    {
      path: '**',
      redirectTo: '/home',
    },
  ];