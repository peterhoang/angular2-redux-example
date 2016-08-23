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

  private imgsrc: string;

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
      })
      .subscribe(t => {
        this.imgsrc = t.path + t.ext;
      });

    this.characters$
      .filter(results => { return results != null; })
      .subscribe((results: any) => {
        let characters = results.toJS();
        characters.forEach(char => {
          this.imgsrc = char.thumbnail.path + '/standard_xlarge.' + char.thumbnail.extension;
        });
      });
  }
}
