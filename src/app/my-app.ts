import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { NgReduxRouter } from 'ng2-redux-router';
import { createEpicMiddleware } from 'redux-observable';

import { IAppState, ISession, rootReducer } from '../store';
import { SessionEpics } from '../epics/session.epics';
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
    private epics: SessionEpics) {

    const enh = (__DEV__ && devTools.isEnabled()) ?
      [ ... enhancers, devTools.enhancer({
        deserializeState: reimmutify,
      }) ] :
      enhancers;

    middleware.push(createEpicMiddleware(this.epics.login));

    ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
    ngReduxRouter.initialize();
  }
}
