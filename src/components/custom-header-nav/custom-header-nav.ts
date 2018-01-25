import { Component, Input } from '@angular/core';

/**
 * Generated class for the CustomHeaderNavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-header-nav',
  templateUrl: 'custom-header-nav.html'
})
export class CustomHeaderNavComponent {

  @Input('title') title: string;

  constructor() {
  }

}
