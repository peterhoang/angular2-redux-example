import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPayloadAction, MarvelActions } from '../actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

const BASE_URL = 'https://gateway.marvel.com/';
const APIKEY = '0f686698f337fe4e6b54c4fa1f5b7430';

@Injectable()
export class MarvelEpics {
  constructor(private http: Http) {}

  getCharacters = (action$: Observable<IPayloadAction>) => {
    return action$
      .flatMap(({ payload }) => {
        return this.http.get(`${BASE_URL}/v1/public/characters&apikey=${APIKEY}`)
          .map(result => ({
            type: MarvelActions.GET_CHARACTERS_SUCCESS,
            payload: result.json().data
          }))
          .catch(error => {
            return Observable.of({
              type: MarvelActions.MARVEL_GENERIC_ERROR
            });
          });
        });
  }
}
