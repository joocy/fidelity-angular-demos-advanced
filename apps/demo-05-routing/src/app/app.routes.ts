import { Routes } from '@angular/router';
import { ShellLayout } from './shell/shell-layout';
import { PortalHome } from './portal/portal-home';
import { authGuard } from './auth/auth.guard';
import { fundResolver } from './funds/fund.resolver';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/portal', pathMatch: 'full' },
  {
    path: 'portal',
    component: ShellLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: PortalHome,
      },
      {
        path: 'funds',
        loadComponent: () => import('./funds/fund-list').then(m => m.FundList),
        data: { preload: true },
      },
      {
        path: 'funds/:id',
        loadComponent: () => import('./funds/fund-detail').then(m => m.FundDetail),
        resolve: { fund: fundResolver },
        canActivate: [authGuard],
      },
      {
        path: 'trading',
        loadComponent: () => import('./trading/trading-layout').then(m => m.TradingLayout),
        canActivate: [authGuard],
        data: { preload: false },
        children: [
          { path: '', redirectTo: 'order-entry', pathMatch: 'full' },
          {
            path: 'order-entry',
            loadComponent: () => import('./trading/order-entry').then(m => m.OrderEntry),
          },
          {
            path: 'order-book',
            loadComponent: () => import('./trading/order-book').then(m => m.OrderBook),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/portal' },
];
