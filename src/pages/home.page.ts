import {Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { MarvelActions } from '../actions/marvel.actions';

@Component({
  pipes: [AsyncPipe],
  selector: 'home-page',
  template: require('./home.page.html')
})
export class HomePage {
  @Input()
  public alerts: Array<IAlert> = [];

  @select(['marvel', 'hasError']) hasError$: Observable<boolean>;
  @select(state => state.marvel) marvelState$: Observable<any>;

  constructor(private actions: MarvelActions) {
  }

  ngOnInit() {
    this.marvelState$
      .filter(m => { return m.hasError; })
      .subscribe(m => {
        this.alerts.push({
          type: 'danger',
          message: m.status
        });
      });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

interface IAlert {
  type: string;
  message: string;
}
