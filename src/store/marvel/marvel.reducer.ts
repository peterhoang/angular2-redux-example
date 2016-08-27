import { IPayloadAction } from '../../actions';
import { MarvelActions } from '../../actions/marvel.actions';
import { INITIAL_STATE } from './marvel.initial-state';
import { IMarvelRecord } from './marvel.types';
import { List } from 'immutable';

export function marvelReducer(
  state: IMarvelRecord = INITIAL_STATE,
  action: IPayloadAction): IMarvelRecord {

  let payload = action.payload;

  switch (action.type) {

    case MarvelActions.GET_CHARACTERS_SUCCESS:
      // let merger = (prev, next) => {
      //   if (List.isList(prev) && List.isList(next)) {
      //     return prev.concat(next);
      //   }
      //   if (prev && prev.mergeWith) {
      //     return prev.mergeWith(merger, next);
      //   }
      //   return next;
      // };

      return state.merge({
        code: payload.code,
        status: payload.status,
        copyright: payload.copyright,
        attributionText: payload.attributionText,
        attributionHTML: payload.attributionHTML,
        characters: payload.data,
        hasError: false,
        isLoading: false
      });

    case MarvelActions.MARVEL_GENERIC_ERROR:
      return state.merge({
        code: payload.code,
        status: payload.message,
        copyright: null,
        attributionText: null,
        attributionHTML: null,
        characters: null,
        hasError: true,
        isLoading: false,
      });

    case MarvelActions.GET_CHARACTERS:
      return state.merge({
        isLoading: true
      });

    default:
      return state;
  }
}
