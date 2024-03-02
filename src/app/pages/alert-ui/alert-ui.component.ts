import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';
import { AlertsComponent } from './sections/alerts/alerts.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';

@Component({
  selector: 'app-alert-ui',
  standalone: true,
  templateUrl: './alert-ui.component.html',
  styleUrl: './alert-ui.component.css',
  imports: [
    LayoutComponent,
    ButtonsComponent,
    AlertsComponent,
    AccordionComponent,
  ],
})
export class AlertUiComponent {
  fire($e: any) {
    console.log($e);
  }
}
