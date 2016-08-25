import { Injectable } from '@angular/core'

@Injectable()
export class MyAppSettings {
  get ITEMS_PER_PAGE(): number {
      return 36;
  }
}
