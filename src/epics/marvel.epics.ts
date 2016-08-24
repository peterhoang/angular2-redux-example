import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { IPayloadAction, MarvelActions } from '../actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

const APIKEY = '0f686698f337fe4e6b54c4fa1f5b7430';

@Injectable()
export class MarvelEpics {
  constructor(private http: Http) {}

  getCharacters = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === MarvelActions.GET_CHARACTERS)
      .flatMap(({ payload }) => {

        let params = new URLSearchParams();
        params.set('apikey', APIKEY);
        if (payload && payload.offset) {
          params.set('offset', payload.offset);
        }
        params.set('limit', '30');

        return this.http.get('/marvel/characters', { search: params })
          .map(result => ({
            type: MarvelActions.GET_CHARACTERS_SUCCESS,
            payload: result.json()
          }))
          .catch(error => {
            return Observable.of({
              type: MarvelActions.MARVEL_GENERIC_ERROR,
              payload: error.json()
            });
          });
        });
  }
}
