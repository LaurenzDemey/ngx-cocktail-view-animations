import { Route } from '@angular/router';
import { pagesRoutes } from '@ngx-cocktail-view-animations/pages';

export const appRoutes: Route[] = [
  ...pagesRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];
