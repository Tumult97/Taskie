import { Route } from '@angular/router';

import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
  path: '',
  redirectTo: '/task',
  pathMatch: 'full',
  data: {
    authorities: [],
    pageTitle: 'Welcome, Java Hipster!'
  }
};
