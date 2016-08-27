import { Iterable } from 'immutable';
import { IMarvelRecord } from './marvel.types';
import { marvelReducer } from './marvel.reducer';
import { MarvelActions } from '../../actions/marvel.actions';

describe('Marvel Reducer', () => {
  let initState: IMarvelRecord;

  beforeEach(() => {
    initState = marvelReducer(undefined, { type: 'TEST_INIT'});
  });

  it('should have an immutable initial state', () => {
    expect(Iterable.isIterable(initState)).toBe(true);
  });

  it('should set loading to be true on MARVEL_GET_CHARACTERS', () => {
    const nextState = marvelReducer(
      initState,
      { type: MarvelActions.GET_CHARACTERS });
    expect(nextState.get('isLoading')).toBeTruthy;
  });

  it('should set a status OK on MARVEL_GET_CHARACTERS_SUCCESS', () => {
    const nextState = marvelReducer(
      initState,
      { type: MarvelActions.GET_CHARACTERS_SUCCESS,
        payload: {
          code: 200,
          status: "Ok",
          copyright: null,
          attributionText: null,
          attributionHTML: null,
          data: null
        }
      });
    expect(nextState.get('isLoading')).toBeFalsy;
    expect(nextState.get('hasError')).toBeFalsy;
    expect(nextState.get('code')).toEqual(200);
    expect(nextState.get('status')).toEqual("Ok");
    expect(nextState.get('copyright')).toEqual(null);
    expect(nextState.get('attributionText')).toEqual(null);
    expect(nextState.get('attributionHTML')).toEqual(null);
    expect(nextState.get('characters')).toEqual(null);
  });

  it('should flag an error on MARVEL_GENERIC_ERROR', () => {
    const nextState = marvelReducer(
      initState,
      {
        type: MarvelActions.MARVEL_GENERIC_ERROR,
        payload: {
          code: null,
          status: null
        }
      });
    expect(nextState.get('isLoading')).toBeFalsy;
    expect(nextState.get('hasError')).toBeTruthy;
  });
});
