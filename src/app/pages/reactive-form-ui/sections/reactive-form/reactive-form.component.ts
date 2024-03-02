import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlOptions,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IFormData } from './reactive-form.types';
import { NginputComponent } from '../../../input-ui/sections/nginput/nginput.component';
import { SelectsComponent } from '../../../input-ui/sections/selects/selects.component';
import { AlertsComponent } from '../../../alert-ui/sections/alerts/alerts.component';
import { TextAreaComponent } from '../../../input-ui/sections/text-area/text-area.component';
import { ChoicesComponent } from '../../../input-ui/sections/choices/choices.component';
import { ButtonsComponent } from '../../../button-ui/sections/buttons/buttons.component';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NginputComponent,
    SelectsComponent,
    AlertsComponent,
    TextAreaComponent,
    ChoicesComponent,
    ButtonsComponent,
  ],
})
export class ReactiveFormComponent {
  @Input() formDataObj: IFormData = null as unknown as IFormData;
  @Input() distance: number = 3;
  @Input() class: string = '';
  @Input() style = '';
  @Input() title: string = '';
  @Input() description: string = '';

  @Output() onFormSubmit: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  form: any = null as unknown as FormGroup;
  formObjectArray: any[] = [];

  ngOnInit() {
    const formDataObj: any = {};
    if (this.formDataObj) {
      for (const prop of Object.keys(this.formDataObj)) {
        formDataObj[prop] = new FormControl(
          {
            value: this.formDataObj[prop].value,
            disabled: this.formDataObj[prop].disabled || false,
          },
          this.mapValidator(this.formDataObj[prop].validators)
        );

        this.formObjectArray.push({
          key: prop,
          label: this.formDataObj[prop].label,
          type: this.formDataObj[prop].type,
          description: this.formDataObj[prop].description,
          options: this.formDataObj[prop].options,
        });
      }
    }

    this.form = new FormGroup(formDataObj);
  }

  mapValidator(validators: any): FormControlOptions {
    if (validators) {
      return Object.keys(validators).map((validationType) => {
        if (validationType === 'required') {
          return Validators.required;
        } else if (validationType === 'min') {
          return Validators.min(validators[validationType]);
        } else if (validationType === 'max') {
          return Validators.max(validators[validationType]);
        } else if (validationType === 'minLength') {
          return Validators.minLength(validators[validationType]);
        } else if (validationType === 'maxLength') {
          return Validators.maxLength(validators[validationType]);
        } else if (validationType === 'pattern') {
          return Validators.pattern(validators[validationType]);
        } else if (validationType === 'email') {
          return Validators.email;
        } else {
          console.warn(`Unknown validation type: ${validationType}`);
          return Validators;
        }
      }) as FormControlOptions;
    } else return null as unknown as FormControlOptions;
  }

  logger(val: any) {
    console.log(val);
  }

  clearForm() {
    this.form.reset(); // Resets the form values
    this.form.markAsPristine(); // Marks the controls as pristine
  }

  submitForm(val: any) {
    this.onFormSubmit.emit(this.form);
  }
}
