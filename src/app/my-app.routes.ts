import {Routes} from '@angular/router';
import {MyApp} from './my-app';
import {
  HomePage,
  CharactersPage
} from '../pages';

export const MY_APP_ROUTES: Routes = [{
  pathMatch: 'full',
  path: '',
  redirectTo: '/home'
}, {
  path: 'home',
  component: HomePage
}, {
  path: 'characters',
  component: CharactersPage
}];
