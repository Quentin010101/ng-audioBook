import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-zen',
  templateUrl: './zen.component.html',
  styleUrls: ['./zen.component.scss']
})
export class ZenComponent {
  @Input() color!: string
}
