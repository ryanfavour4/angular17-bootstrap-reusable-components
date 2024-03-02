import { Component } from '@angular/core';
import { TablesComponent } from './sections/tables/tables.component';
import users from './user-table-data.json';
import country from './country-data.json';
import { LabelsComponent } from '../label-ui/sections/labels/labels.component';
import { PanelsComponent } from '../panel-ui/sections/panels/panels.component';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';
import { ReactiveFormComponent } from '../reactive-form-ui/sections/reactive-form/reactive-form.component';
import { FormGroup } from '@angular/forms';
import { IFormData } from '../reactive-form-ui/sections/reactive-form/reactive-form.types';
import { data } from 'jquery';

@Component({
  selector: 'app-table-ui',
  standalone: true,
  templateUrl: './table-ui.component.html',
  styleUrl: './table-ui.component.css',
  imports: [
    TablesComponent,
    LabelsComponent,
    PanelsComponent,
    ButtonsComponent,
    ReactiveFormComponent,
  ],
})
export class TableUiComponent {
  userData: any = country;
  addModalClicked: boolean = true;
  tableHeadData = [
    { title: 'ID', sortBy: 'id', sortByType: 'number' },
    { title: 'Country', sortBy: 'country', sortByType: 'string' },
    { title: 'Short Name', sortBy: 'alt', sortByType: 'string' },
    { title: 'Ranking', sortBy: 'rating', sortByType: 'number' },
    { title: 'Coach' },
  ];

  countryForm: IFormData = {
    id: {
      label: 'Club id',
      type: 'number',
      value: '',
    },
    country: {
      label: 'Country',
      type: 'text',
      value: '',
    },
    alt: {
      label: 'Short Name',
      type: 'username',
      value: '',
      description: 'We will use this to easily give you a nickname',
    },
    rating: {
      label: 'Ranting',
      type: 'number',
      value: '',
    },
    coach: {
      label: 'Coach',
      type: 'text',
      value: '',
    },
  };

  formSubmit(val: FormGroup) {
    console.log(val.value);
  }

  setItemSelected(val: any) {
    console.log(val);
  }

  toggleModalTypeClicked(e: { clicked: 'add' | 'edit'; data: any }) {
    if (e.clicked == 'add') {
      this.addModalClicked = true;
    } else {
      for (const key in this.countryForm) {
        if (
          this.countryForm.hasOwnProperty(key) &&
          e.data.hasOwnProperty(key)
        ) {
          this.countryForm[key].value = e.data[key];
          this.countryForm['id'].disabled = true;
        }
      }
      this.addModalClicked = false;
    }
  }
}
