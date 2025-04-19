import { Component, signal } from '@angular/core';
import { StepsComponent } from "../steps/steps.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../form-field/form-field.component";

const fieldLabels = {
  name: 'nome',
  phone: 'telefone',
  email: 'e-mail'
} as const;

type FieldName = keyof typeof fieldLabels;

@Component({
  selector: 'app-multistep-form',
  imports: [StepsComponent, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './multistep-form.component.html',
  styleUrl: './multistep-form.component.scss'
})
export class MultistepFormComponent {
  currentStep = signal(0);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
  });
  
  get name() {
    return this.form.controls.name;
  }

  get phone() {
    return this.form.controls.phone;
  }


  get email() {
    return this.form.controls.email;
  }

  getErrorMessage(controlName: FieldName): string {
    const formControl = this.form.controls[controlName];
    const fieldLabel = fieldLabels[controlName];

    if (formControl.hasError('required')) return `O campo ${fieldLabel} obrigatório`;

    let ret = '';
    switch (controlName) {
      case 'phone':
        if (formControl.hasError('minlength')) ret = 'O número de telefone deve ter pelo menos 10 dígitos';
        return ret;
      case 'email':
        if (formControl.hasError('email')) ret = 'E-mail inválido';
        return ret;
      default:
        return ret;
    }

  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
