import { IPayloadAction } from '../../actions';
import { MarvelActions } from '../../actions/marvel.actions';
import { INITIAL_STATE } from './marvel.initial-state';
import { IMarvelRecord } from './marvel.types';

export function marvelReducer(
  state: IMarvelRecord = INITIAL_STATE,
  action: IPayloadAction): IMarvelRecord {

  let payload = action.payload;

  switch (action.type) {

    case MarvelActions.GET_CHARACTERS_SUCCESS:
      return state.merge({
        code: payload.code,
        status: payload.status,
        copyright: payload.copyright,
        attributionText: payload.attributionText,
        attributionHTML: payload.attributionHTML,
        data: payload.data,
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
        data: [],
        hasError: true,
        isLoading: false,
      });

    case MarvelActions.GET_CHARACTERS:
      return INITIAL_STATE;

    default:
      return state;
  }
}
