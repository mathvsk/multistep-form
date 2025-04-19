import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'input-component',
  }
})
export class FormFieldComponent {
  title = input.required<string>();
}
