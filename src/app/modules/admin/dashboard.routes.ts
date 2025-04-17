import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import { authGuard } from '../../core/auth/guard/auth.guard';
import { PanelComponent } from './panel/panel.component';
import { panelResolver } from './panel/panel.resolver';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', 
    component: DashboardComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        component: BoardComponent,
      },
      {
        path:'boards',
        component: BoardComponent
      },
      {
        path:'favorites',
        component: BoardComponent
      },
      {
        path:':id',
        component: PanelComponent,
        resolve: {
          panel: panelResolver
        }
      },
    ]
  },
];