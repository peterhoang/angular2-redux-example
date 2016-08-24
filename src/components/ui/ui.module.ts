import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RioAlert} from '../alert/alert.component';
import {RioButton} from '../button/button.component';
import {RioLogo} from '../logo/logo.component';
import {RioContainer} from '../container/container.component';
import {ThumbnailGrid} from '../thumbnail-grid/thumbnail-grid.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule
  ],
  declarations: [
    RioAlert,
    RioButton,
    RioLogo,
    RioContainer,
    ThumbnailGrid
  ],
  exports: [
    RioAlert,
    RioButton,
    RioLogo,
    RioContainer,
    ThumbnailGrid
  ]
})
export class UiModule { }
