import { Component } from '@angular/core';
import { ReactiveFormComponent } from './sections/reactive-form/reactive-form.component';
import { IFormData } from './sections/reactive-form/reactive-form.types';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-ui',
  standalone: true,
  templateUrl: './reactive-form-ui.component.html',
  styleUrl: './reactive-form-ui.component.css',
  imports: [ReactiveFormComponent],
})
export class ReactiveFormUiComponent {
  person: IFormData = {
    firstname: {
      label: 'First Name',
      value: '',
      type: 'text',
      validators: {
        required: true,
      },
    },
    age: {
      label: 'Age',
      value: 0,
      type: 'number',
      validators: {
        min: 18,
      },
    },
    username: {
      label: 'User name',
      value: '',
      type: 'username',
      description: 'What do you want to be your username eg. @ryanfavour4',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
    },
    dateOfBirth: {
      label: 'Date Of Birth',
      value: '',
      type: 'date',
      validators: {
        required: true,
      },
    },
    comment: {
      label: 'Comment',
      value: '',
      type: 'text-area',
      validators: {
        required: true,
      },
    },
    city: {
      label: 'City',
      value: '',
      type: 'select',
      options: [
        { label: '(choose one)', value: '' },
        { label: 'New York', value: 'NY' },
        { label: 'Los Angeles', value: 'LA' },
        { label: 'Salt Lake City', value: 'SLC' },
      ],
    },
    gender: {
      label: 'Gender',
      value: 'F',
      type: 'radio',
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
      ],
    },
    agree: {
      label: 'Agree to terms',
      value: true,
      type: 'checkbox',
      description:
        'Control the center and develop your pieces. 1.e4 is a strong opening move.',
    },
  };

  formSubmit(val: FormGroup) {
    console.log(val.value);
  }
}
