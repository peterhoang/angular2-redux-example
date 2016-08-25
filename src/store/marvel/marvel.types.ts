import { List } from 'immutable';
import { TypedRecord } from 'typed-immutable-record';

export interface IMarvelCharacter {
  name: string;
  thumbnail: Object;
}
export interface IMarvelCharacterRecord extends TypedRecord<IMarvelCharacterRecord>, IMarvelCharacter {
}

export interface IMarvelCharacterResults {
  offset: number;
  limit: number;
  total: number;
  counter: number;
  results: List<IMarvelCharacter>;
}
export interface IMarvelCharacterResultsRecord extends TypedRecord<IMarvelCharacterResultsRecord>,
  IMarvelCharacterResults {
}

export interface IMarvel {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: IMarvelCharacterResults;
  hasError: boolean;
  isLoading: boolean;
}
export interface IMarvelRecord extends TypedRecord<IMarvelRecord>, IMarvel {
}
