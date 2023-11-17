import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss']
})
export class ButtonSubmitComponent {
  @Input() form!: FormGroup
  @Output() ev = new EventEmitter()

  emit(){
    this.ev.emit()
  }
}
