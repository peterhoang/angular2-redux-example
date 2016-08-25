import { Component } from '@angular/core';
import { MarvelActions } from '../actions/marvel.actions';

@Component({
  selector: 'characters-page',
  template: `
    <p *ngFor="let alert of alerts">
      <ngb-alert [type]="alert.type" (close)="closeAlert(alert)">{{ alert.message }}</ngb-alert>
    </p>
    <thumbnail-grid></thumbnail-grid>
  `
})
export class CharactersPage {
  constructor(private actions: MarvelActions) {

  }

  ngOnInit() {
    this.actions.getCharacters();
  }
}
