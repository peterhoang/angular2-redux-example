import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { MarvelActions } from '../../actions/marvel.actions';
import { MyAppSettings } from '../../app/my-app.settings';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';

@Component({
  pipes: [AsyncPipe],
  selector: 'thumbnail-grid',
  template: require('./thumbnail-grid.component.html'),
  directives: [ InfiniteScroll ]
})
export class ThumbnailGrid {
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'path']) path$: Observable<string>;
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'extension']) ext$: Observable<string>;
  @select(state => state.marvel.data.results) results$: Observable<Array<Object>>;

  private characters$: Observable<Array<Object>>;
  private offset: number;

  constructor(private actions: MarvelActions, private appSettings: MyAppSettings) {
    this.offset = 0;
    this.characters$ = Observable.from([]);
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

    this.characters$ = this.results$
      .filter(results => { return results != null; })
      .map((results: any) => {
        let images = [];
        results.forEach(char => {
          char.resolvedImage = (char.thumbnail.path + '/standard_amazing.' + char.thumbnail.extension);
        });
        return results;
      });
  }

  onScrollDown() {
    this.offset += this.appSettings.ITEMS_PER_PAGE;
    this.actions.getCharacters({ offset: this.offset });
  }
}
