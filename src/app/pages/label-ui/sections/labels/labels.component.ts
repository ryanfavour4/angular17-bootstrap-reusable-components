import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labels',
  standalone: true,
  imports: [],
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.css',
})
export class LabelsComponent {
  @Input()
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'dark'
    | 'light'
    | 'default'
    | '' = '';
}
