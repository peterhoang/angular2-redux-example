import { Action } from 'redux';
import { CounterActions } from './counter.actions';
import { SessionActions } from './session.actions';
import { MarvelActions } from './marvel.actions';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [
  CounterActions,
  SessionActions,
  MarvelActions
];
export {
  CounterActions,
  SessionActions,
  MarvelActions
};
