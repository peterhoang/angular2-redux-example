import {Routes} from '@angular/router';
import {MyApp} from './my-app';

export const MY_APP_ROUTES: Routes = [{
  pathMatch: 'full',
  path: '',
  redirectTo: '/home'
}, {
  path: 'home',
  component: MyApp
}];
