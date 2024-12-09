import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren:()=> import('./auth/features/auth.routes'),
    //loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
