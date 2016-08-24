import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { MarvelActions } from '../../actions/marvel.actions';

@Component({
  pipes: [AsyncPipe],
  selector: 'thumbnail-grid',
  template: require('./thumbnail-grid.component.html'),
  directives: [ InfiniteScroll ]
})
export class ThumbnailGrid {
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'path']) path$: Observable<string>;
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'extension']) ext$: Observable<string>;
  @select(['marvel', 'data', 'results']) results$: Observable<Array<Object>>;

  private characters$: Observable<Array<Object>>;
  private offset: number;

  constructor(private actions: MarvelActions) {
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
        let characters = results.toJS();
        let images = [];
        characters.forEach(char => {
          char.resolvedImage = (char.thumbnail.path + '/standard_large.' + char.thumbnail.extension);
        });
        return characters;
      })
      .scan((acc: any, value: any) => {
        return acc.concat(value);
      });
  }

  onScrollDown() {
    this.offset += 20;
    this.actions.getCharacters(this.offset);
  }
}
