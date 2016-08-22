import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as counter from './counter';
import * as session from './session';
import * as marvel from './marvel';


export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
  marvel?: marvel.IMarvel;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counter.counterReducer,
  session: session.sessionReducer,
  marvel: marvel.marvelReducer,
  router: routerReducer,
});

export function deimmutify(store) {
  return {
    counter: store.counter.toJS(),
    session: store.session.toJS(),
    marvel: store.marvel.toJS(),
    router: store.router,
  };
}

export function reimmutify(plain) {
  return {
    counter: counter.CounterFactory(plain.counter),
    session: session.SessionFactory(plain.session),
    marvel: marvel.MarvelFactory(plain.marvel),
    router: plain.router,
  };
}
