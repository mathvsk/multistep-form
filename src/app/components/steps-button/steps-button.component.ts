import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-steps-button',
  imports: [],
  templateUrl: './steps-button.component.html',
  styleUrl: './steps-button.component.scss'
})
export class StepsButtonComponent {
  currentStep = model(0);

  onClickBack() {
    this.currentStep.update((step) => step - 1);
  }

  onClickContinue() {
    this.currentStep.update((step) => step + 1);
  }
}
