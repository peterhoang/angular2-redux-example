import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

@Component({
  pipes: [AsyncPipe],
  selector: 'thumbnail-grid',
  template: require('./thumbnail-grid.component.html')
})
export class ThumbnailGrid {
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'path']) path$: Observable<string>;
  @select(['marvel', 'data', 'results', 0, 'thumbnail', 'extension']) ext$: Observable<string>;
  @select(['marvel', 'data', 'results']) characters$: Observable<Object>;

  private characters: Array<string>;

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

    this.characters$
      .filter(results => { return results != null; })
      .map((results: any) => {
        let characters = results.toJS();
        let images = [];
        characters.forEach(char => {
          char.resolvedImage = (char.thumbnail.path + '/standard_large.' + char.thumbnail.extension);
        });
        return characters;
      })
      .subscribe((data: any) => {
        this.characters = data;
      });
  }
}
