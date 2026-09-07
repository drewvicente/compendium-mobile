import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    children: [
      {
        path: 'manuscripts',
        loadComponent: () =>
          import('./pages/manuscripts/manuscripts.page').then((m) => m.ManuscriptsPage),
      },
      {
        path: 'manuscripts/:id',
        loadComponent: () =>
          import('./pages/manuscript-detail/manuscript-detail.page').then(
            (m) => m.ManuscriptDetailPage,
          ),
      },
      { path: '', redirectTo: 'manuscripts', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
