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
  results: Array<IMarvelCharacter>;
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
  characters: IMarvelCharacterResults;
  hasError: boolean;
  isLoading: boolean;
}
export interface IMarvelRecord extends TypedRecord<IMarvelRecord>, IMarvel {
}
