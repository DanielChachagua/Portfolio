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
        path: '',
        loadChildren: () =>
          import('./content/content.routes').then((m) => m.CONTENT_ROUTES),
      },
    ]
  }
];