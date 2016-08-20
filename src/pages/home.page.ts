import {Component} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'home',
  directives: [
      AlertComponent
    ],
  template: require('./home.page.html')
})
export class HomePage {
  date: Date = new Date();
}
