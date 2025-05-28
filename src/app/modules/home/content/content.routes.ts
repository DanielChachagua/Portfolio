import { Routes } from '@angular/router';
import { InitialComponent } from '../initial/initial.component';

export const CONTENT_ROUTES: Routes = [
  {
    path:'',
    component: InitialComponent,
  },
      {
        path: '',
        loadChildren: () =>
          import('../initial/initial.routes').then((m) => m.INITIAL_ROUTES),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.routes').then((m) => m.ABOUT_ROUTES),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../project/project.routes').then((m) => m.PROJECT_ROUTES),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('../contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
    
  
];