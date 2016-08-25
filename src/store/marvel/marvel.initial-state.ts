import {
  IMarvel,
  IMarvelRecord
} from './marvel.types';
import { makeTypedFactory } from 'typed-immutable-record';

export const MarvelFactory = makeTypedFactory<IMarvel, IMarvelRecord>({
  code: 0,
  status: null,
  copyright: null,
  attributionText: null,
  attributionHTML: null,
  data: [],
  hasError: false,
  isLoading: false
});

export const INITIAL_STATE = MarvelFactory();
