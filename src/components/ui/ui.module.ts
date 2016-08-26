import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ThumbnailGrid} from '../thumbnail-grid/thumbnail-grid.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule
  ],
  declarations: [
    ThumbnailGrid
  ],
  exports: [
    ThumbnailGrid
  ]
})
export class UiModule { }
