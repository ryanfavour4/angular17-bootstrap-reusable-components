import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { InputsComponent } from './sections/inputs/inputs.component';
import { NginputComponent } from './sections/nginput/nginput.component';
import { SelectsComponent } from './sections/selects/selects.component';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';
import { ReactiveFormUiComponent } from '../reactive-form-ui/reactive-form-ui.component';
import { ChoicesComponent } from './sections/choices/choices.component';
import { TextAreaComponent } from './sections/text-area/text-area.component';

@Component({
  selector: 'app-input-ui',
  standalone: true,
  templateUrl: './input-ui.component.html',
  styleUrl: './input-ui.component.css',
  imports: [
    LayoutComponent,
    InputsComponent,
    NginputComponent,
    SelectsComponent,
    ReactiveFormsModule,
    ButtonsComponent,
    ReactiveFormUiComponent,
    ChoicesComponent,
    TextAreaComponent,
  ],
})
export class InputUiComponent {
  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    assuranceLevel: new FormControl('', [Validators.required]),
    agreeToTerms: new FormControl('', [Validators.required]),
  });

  genderOptions = [
    { label: 'Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Genderfluid', value: 'genderfluid' },
    { label: 'Agender', value: 'agender' },
    { label: 'Genderqueer', value: 'genderqueer' },
    { label: 'Two-Spirit', value: 'two-spirit' },
  ];

  user: any = {
    name: 'John',
    age: 22,
    color: '#b42d2d',
    gender: '',
    email: 'john@example.com',
    assuranceLevel: 40,
    agreeToTerms: true,
  };

  setUser(e: any | HTMLInputElement | MouseEvent) {
    if (e.target.type == 'checkbox') {
      this.user[e.target.name] = e.target.checked;
    } else {
      this.user[e.target.name] = e.target.value;
    }
  }

  submitApplyForm() {
    console.log(this.applyForm.value);
  }

  submitForm() {
    console.log(this.user);
  }
}
