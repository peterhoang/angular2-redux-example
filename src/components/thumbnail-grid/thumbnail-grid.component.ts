import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { MarvelActions } from '../../actions/marvel.actions';
import { MyAppSettings } from '../../app/my-app.settings';
import { Map } from 'immutable';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';

@Component({
  pipes: [AsyncPipe],
  selector: 'thumbnail-grid',
  template: require('./thumbnail-grid.component.html')
})
export class ThumbnailGrid {
  @select(['marvel', 'characters', 'results', 0, 'thumbnail', 'path']) path$: Observable<string>;
  @select(['marvel', 'characters', 'results', 0, 'thumbnail', 'extension']) ext$: Observable<string>;
  @select(['marvel', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['marvel', 'characters']) data$: Observable<Array<Object>>;
  @select(['marvel', 'attributionText']) attText$: Observable<string>;

  private characters$: Observable<Array<Object>>;
  private offset: number;
  private pageNumber: number;
  private collectionSize: number;

  constructor(private actions: MarvelActions, private appSettings: MyAppSettings) {
  }

  ngOnInit() {
    this.path$
      .combineLatest(
        this.ext$,
        (path, ext) => ({ext: '/standard_fantastic.' + ext, path: path})
      )
      .filter(obj => {
        return obj.path != null && obj.ext != null;
      })
      .startWith({
        ext: '',
        path: 'http://placehold.it/400x300'
      });

    this.characters$ = this.data$
      .map((data: any) => {
        // Ugly solution for now: at the beginning of fresh app launch, the persistent store is deimmutify (js object)
        // however, during app session, the reducer returns the store's state as immutable objects
        if (Map.isMap(data)) {
          data = data.toJS();
        }

        this.collectionSize = data.total;

        // determine current page
        this.pageNumber = (data.offset / data.limit) + 1;
        this.offset = data.offset;

        let character = data.results;
        character.forEach(char => {
          char.resolvedImage = (char.thumbnail.path + '/standard_amazing.' + char.thumbnail.extension);
        });
        return character;
      });
  }

  onPageChange(pageNumber: number) {
    this.actions.getCharacters({ offset: this.appSettings.ITEMS_PER_PAGE * (pageNumber - 1) });
  }

  onScrollDown() {
    this.offset += this.appSettings.ITEMS_PER_PAGE;
    this.actions.getCharacters({ offset: this.offset });
  }
}
