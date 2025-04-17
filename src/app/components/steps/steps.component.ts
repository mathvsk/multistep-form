import { Component, input, signal } from '@angular/core';

type Step = 'Contato' | 'Empresa' | 'Projeto';

@Component({
  selector: 'app-steps',
  imports: [],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {
  currentStep = input<number>(0);

  stepList = signal<Step[]>([
    'Contato',
    'Empresa',
    'Projeto'
  ]);
}
