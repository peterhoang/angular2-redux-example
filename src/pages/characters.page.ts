import { Component } from '@angular/core';
import { MarvelActions } from '../actions/marvel.actions';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'characters-page',
  template: `
    <button type="button" class="btn btn-primary" (click)="actions.getCharacters()">Load</button>
    <p *ngFor="let alert of alerts">
      <ngb-alert [type]="alert.type" (close)="closeAlert(alert)">{{ alert.message }}</ngb-alert>
    </p>
    <thumbnail-grid></thumbnail-grid>
  `
})
export class CharactersPage {
  @select(['marvel', 'data', 'count']) private count$: Observable<number>;

  private isLoaded: boolean = false;

  constructor(private actions: MarvelActions) {  }

  ngOnInit() {
    this.isLoaded = true;
  }
}
