import { TypedRecord } from 'typed-immutable-record';

export interface IMarvel {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: any;
  hasError: boolean;
  isLoading: boolean;
};

export interface IMarvelRecord extends TypedRecord<IMarvelRecord>, IMarvel {
};
