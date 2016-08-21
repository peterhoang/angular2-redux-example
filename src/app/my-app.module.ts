import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
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
import {MyApp} from './my-app';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    CommonModule,
    HttpModule
  ],
  declarations: [
    MyApp
  ],
  bootstrap: [
    MyApp
  ],
  providers: [
    DevToolsExtension,
    FormBuilder,
    NgRedux,
    NgReduxRouter,
    appRoutingProviders
  ]
})
export class MyAppModule { }
