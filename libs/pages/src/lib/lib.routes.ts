import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { CocktailApiService } from '@ngx-cocktail-view-animations/cocktail-api';

export const pagesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'cocktails',
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Cocktails',
        loadComponent: () => import('./cocktails/cocktails.component'),
      },
      {
        path: ':id',
        pathMatch: 'full',
        title: 'Cocktail detail',
        resolve: {
          detail: (snapshot: ActivatedRouteSnapshot) =>
            inject(CocktailApiService).getCocktailDetail(snapshot.params['id']),
        },
        loadComponent: () =>
          import('./cocktails/cocktailsDetail/cocktails-detail.component'),
      },
    ],
  },
  {
    path: 'about',
    pathMatch: 'full',
    title: 'About',
    loadComponent: () => import('./about/about.component'),
  },
];
