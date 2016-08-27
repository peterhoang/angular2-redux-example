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
    expect(Iterable.isIterable(initState).toBe(true));
  });

  it('should set loading to be true on MARVEL_GET_CHARACTERS', () => {
    const nextState = marvelReducer(
      initState,
      { type: MarvelActions.GET_CHARACTERS });
    expect(nextState.get('isLoading')).toBeTruthy;
  });
});
