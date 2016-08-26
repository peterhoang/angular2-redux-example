import {
  IMarvel,
  IMarvelRecord,
  IMarvelCharacter,
  IMarvelCharacterRecord,
  IMarvelCharacterResults,
  IMarvelCharacterResultsRecord
} from './marvel.types';
import { makeTypedFactory } from 'typed-immutable-record';


export const MarvelCharacterFactory = makeTypedFactory<IMarvelCharacter, IMarvelCharacterRecord>({
  name: null,
  thumbnail: null
});

export const MarvelCharacterResultsFactory = makeTypedFactory<IMarvelCharacterResults, IMarvelCharacterResultsRecord>({
  offset: 0,
  limit: 0,
  total: 0,
  results: []
});

export const MarvelFactory = makeTypedFactory<IMarvel, IMarvelRecord>({
  code: 0,
  status: null,
  copyright: null,
  attributionText: null,
  attributionHTML: null,
  data: MarvelCharacterResultsFactory(),
  hasError: false,
  isLoading: false
});

export const INITIAL_STATE = MarvelFactory();
