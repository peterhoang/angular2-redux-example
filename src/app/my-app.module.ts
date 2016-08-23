import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
  DevToolsExtension,
  NgRedux
} from 'ng2-redux';
import {NgReduxRouter} from 'ng2-redux-router';
import {
  routing,
  appRoutingProviders
} from './my-app.routing';
import {HttpModule} from '@angular/http';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MyApp} from './my-app';
import {
  HomePage
} from '../pages';
import {
  SessionActions,
  MarvelActions } from '../actions';
import {
  SessionEpics,
  MarvelEpics } from '../epics';
import {
  Navigator
} from '../components/navigator';
import { UiModule } from '../components/ui/ui.module';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    UiModule
  ],
  declarations: [
    MyApp,
    Navigator,
    HomePage
  ],
  bootstrap: [
    MyApp
  ],
  providers: [
    DevToolsExtension,
    FormBuilder,
    NgRedux,
    NgReduxRouter,
    appRoutingProviders,
    SessionActions,
    SessionEpics,
    MarvelActions,
    MarvelEpics
  ]
})
export class MyAppModule { }
