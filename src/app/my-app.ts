import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { IAppState, ISession, rootReducer } from '../store';
import {
  SessionEpics,
  MarvelEpics } from '../epics';
import { middleware, enhancers, reimmutify } from '../store';

@Component({
  selector: 'my-app',
  template: require('./my-app.html')
})
export class MyApp {
  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private epics: SessionEpics,
    private marvelEpics: MarvelEpics) {

    const enh = (__DEV__ && devTools.isEnabled()) ?
      [ ... enhancers, devTools.enhancer({
        deserializeState: reimmutify,
      }) ] :
      enhancers;

    const rootEpics = combineEpics(
      this.epics.login,
      this.marvelEpics.getCharacters
    );
    middleware.push(createEpicMiddleware(rootEpics));

    ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
    ngReduxRouter.initialize();
  }
}
