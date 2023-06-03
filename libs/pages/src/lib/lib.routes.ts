import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'cocktails',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./cocktails/cocktails.component'),
      },
      {
        path: ':id',
        pathMatch: 'full',
        loadComponent: () =>
          import('./cocktails/cocktailsDetail/cocktails-detail.component'),
      },
    ],
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => import('./about/about.component'),
  },
];
