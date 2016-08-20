import {
  Routes,
  RouterModule
} from '@angular/router';
import {MY_APP_ROUTES} from './my-app.routes';

const appRoutes: Routes = MY_APP_ROUTES;

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
