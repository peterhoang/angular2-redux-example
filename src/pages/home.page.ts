import {Component, Input} from '@angular/core';
import { MarvelActions } from '../actions/marvel.actions';

@Component({
  selector: 'home-page',
  template: require('./home.page.html')
})
export class HomePage {
  model = 1;

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor(private actions: MarvelActions) {

  }

  ngOnInit() {
    
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }
}

interface IAlert {
  id: number;
  type: string;
  message: string;
}
