import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/auth/guard/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', 
    component: DashboardComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
    ]
  },
];