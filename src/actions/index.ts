import { Action } from 'redux';
import { SessionActions } from './session.actions';
import { MarvelActions } from './marvel.actions';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [
  SessionActions,
  MarvelActions
];
export {
  SessionActions,
  MarvelActions
};
