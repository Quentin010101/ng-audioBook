import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-off',
  templateUrl: './off.component.html',
  styleUrls: ['./off.component.scss']
})
export class OffComponent {
  @Input() color!: string
}
