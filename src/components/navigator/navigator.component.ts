import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-navigator',
  template: require('./navigator.component.html')
})
export class Navigator {
  @Input() testid: string;
};
