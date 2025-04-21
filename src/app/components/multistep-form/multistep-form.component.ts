import { Component } from '@angular/core';
import { StepsComponent } from "../steps/steps.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../form-field/form-field.component";
import { StepsButtonComponent } from "../steps-button/steps-button.component";

const fieldLabels = {
  name: 'nome',
  phone: 'telefone',
  email: 'e-mail',
  businessName: 'nome da empresa',
  numberOfEmployees: 'número de funcionários',
  aboutYourBusiness: 'sobre seu negócio',
  projectObjectives: 'objetivos do projeto'
} as const;

type FieldName = keyof typeof fieldLabels;

@Component({
  selector: 'app-multistep-form',
  imports: [StepsComponent, ReactiveFormsModule, FormFieldComponent, StepsButtonComponent],
  templateUrl: './multistep-form.component.html',
  styleUrl: './multistep-form.component.scss'
})
export class MultistepFormComponent {
  currentStep = 0;
  isSubmitting = false;

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
    businessName: new FormControl('', {
      validators: [Validators.required],
    }),
    numberOfEmployees: new FormControl('', {
      validators: [Validators.required],
    }),
    aboutYourBusiness: new FormControl('', {
      validators: [Validators.required],
    }),
    projectObjectives: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get disabledButton() {
    let ret = false;
    if (this.currentStep === 0) {
      ret = this.form.controls.name.invalid || this.form.controls.phone.invalid || this.form.controls.email.invalid;
    } else if (this.currentStep === 1) {
      ret = this.form.controls.businessName.invalid || this.form.controls.numberOfEmployees.invalid || this.form.controls.aboutYourBusiness.invalid;
    } else if (this.currentStep === 2) {
      ret = this.projectObjectives.invalid;
    }

    return ret;
  };
  
  get name() {
    return this.form.controls.name;
  }

  get phone() {
    return this.form.controls.phone;
  }

  get email() {
    return this.form.controls.email;
  }

  get businessName() {
    return this.form.controls.businessName;
  }

  get numberOfEmployees() {
    return this.form.controls.numberOfEmployees;
  }

  get aboutYourBusiness() {
    return this.form.controls.aboutYourBusiness;
  }

  get projectObjectives() {
    return this.form.controls.projectObjectives;
  }

  getErrorMessage(controlName: FieldName): string {
    const formControl = this.form.controls[controlName];
    const fieldLabel = fieldLabels[controlName];

    if (formControl.hasError('required')) return `O campo "${fieldLabel}" é obrigatório`;

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
    this.isSubmitting = true;
    
    setTimeout(() => {
      this.isSubmitting = false;
      console.log(this.form.value);
      alert('Formulário enviado com sucesso!');
      this.form.reset();
      this.currentStep = 0;
    }, 5000);
  }
}
