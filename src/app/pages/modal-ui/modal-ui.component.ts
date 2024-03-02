import { Component } from '@angular/core';
import { ModalsComponent } from './sections/modals/modals.component';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';
import { ModalAlertComponent } from './sections/modal-alert/modal-alert.component';

@Component({
  selector: 'app-modal-ui',
  standalone: true,
  templateUrl: './modal-ui.component.html',
  styleUrl: './modal-ui.component.css',
  imports: [
    ModalsComponent,
    LayoutComponent,
    ButtonsComponent,
    ModalAlertComponent,
  ],
})
export class ModalUiComponent {
  isOpen: boolean = false;
  isLeftOpen: boolean = false;
  isTopOpen: boolean = false;
  isCenterOpen: boolean = false;

  isModalAlertOpen = false;

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  toggleIsLeftOpenModal(): void {
    this.isLeftOpen = !this.isLeftOpen;
  }

  toggleIsTopOpenModal(): void {
    this.isTopOpen = !this.isTopOpen;
  }

  toggleIsCenterOpenModal(): void {
    this.isCenterOpen = !this.isCenterOpen;
  }

  toggleIsModalAlertOpenModal(): void {
    this.isModalAlertOpen = !this.isModalAlertOpen;
  }
}
