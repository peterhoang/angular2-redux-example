import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class MarvelActions {
  static GET_CHARACTERS = 'GET_CHARACTERS';
  static GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
  static MARVEL_GENERIC_ERROR = 'MARVEL_GENERIC_ERROR';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  getCharacters() {
    this.ngRedux.dispatch({ type: MarvelActions.GET_CHARACTERS });
  };
}
