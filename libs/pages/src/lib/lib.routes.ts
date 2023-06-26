import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { CocktailApiService } from '@ngx-cocktail-view-animations/cocktail-api';

export const pagesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Home',
    resolve: {
      cocktail1: () => inject(CocktailApiService).getRandomCocktail(),
      cocktail2: () => inject(CocktailApiService).getRandomCocktail(),
      cocktail3: () => inject(CocktailApiService).getRandomCocktail(),
      cocktail4: () => inject(CocktailApiService).getRandomCocktail(),
    },
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'cocktails',
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Cocktails',
        resolve: {
          items: (snapshot: ActivatedRouteSnapshot) =>
            inject(CocktailApiService).listCocktailsByFirstLetter(
              snapshot.queryParams['letter'] || 'A'
            ),
        },
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
