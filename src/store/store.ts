import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as session from './session';
import * as marvel from './marvel';


export interface IAppState {
  session?: session.ISession;
  marvel?: marvel.IMarvel;
};

export const rootReducer = combineReducers<IAppState>({
  session: session.sessionReducer,
  marvel: marvel.marvelReducer,
  router: routerReducer,
});

export function deimmutify(store) {
  return {
    session: store.session.toJS(),
    marvel: store.marvel.toJS(),
    router: store.router,
  };
}

export function reimmutify(plain) {
  return {
    session: session.SessionFactory(plain.session),
    marvel: marvel.MarvelFactory(plain.marvel),
    router: plain.router,
  };
}
