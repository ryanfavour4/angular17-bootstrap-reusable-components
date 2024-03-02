import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { LabelsComponent } from './sections/labels/labels.component';

@Component({
  selector: 'app-label-ui',
  standalone: true,
  imports: [LayoutComponent, LabelsComponent],
  templateUrl: './label-ui.component.html',
  styleUrl: './label-ui.component.css',
})
export class LabelUiComponent {}
