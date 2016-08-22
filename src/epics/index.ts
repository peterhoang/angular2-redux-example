import { SessionEpics } from './session.epics';
import { MarvelEpics } from './marvel.epics';

export const EPIC_PROVIDERS = [
  SessionEpics,
  MarvelEpics
];
export {
  SessionEpics,
  MarvelEpics
};
