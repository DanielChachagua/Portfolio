import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  { path: '', 
    component: HomeComponent,
    children: [
      // {
      //   path: 'create',
      //   component: CreateProjectComponent,
      // },
    ]
  },
];