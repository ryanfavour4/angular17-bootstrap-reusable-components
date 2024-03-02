import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { PanelsComponent } from './sections/panels/panels.component';
import { LabelsComponent } from '../label-ui/sections/labels/labels.component';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';

@Component({
  selector: 'app-panel-ui',
  standalone: true,
  templateUrl: './panel-ui.component.html',
  styleUrl: './panel-ui.component.css',
  imports: [
    LayoutComponent,
    PanelsComponent,
    LabelsComponent,
    ButtonsComponent,
  ],
})
export class PanelUiComponent {}
