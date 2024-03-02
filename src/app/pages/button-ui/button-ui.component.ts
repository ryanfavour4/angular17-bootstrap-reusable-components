import { Component } from '@angular/core';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { ButtonsComponent } from './sections/buttons/buttons.component';

@Component({
  selector: 'app-button-ui',
  standalone: true,
  templateUrl: './button-ui.component.html',
  styleUrl: './button-ui.component.css',
  imports: [AccordionComponent, LayoutComponent, ButtonsComponent],
})
export class ButtonUiComponent {
  fire() {
    console.log('wh');
  }
}
