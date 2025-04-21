import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-steps-button',
  imports: [],
  templateUrl: './steps-button.component.html',
  styleUrl: './steps-button.component.scss'
})
export class StepsButtonComponent {
  currentStep = model(0);
  disabled = input(false);
  isSubmitting = input(false);

  onClickBack() {
    this.currentStep.update((prev) => --prev);
  }

  onClickContinue() {
    this.currentStep.update((prev) => ++prev);

  }
}
