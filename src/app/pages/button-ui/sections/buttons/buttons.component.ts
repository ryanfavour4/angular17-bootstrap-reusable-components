import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
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
    | 'default' = 'default';
  @Input()
  size: 'md' | 'lg' | 'sm' = 'md';
  type: 'button' | 'menu' | 'reset' | 'submit' | '' = '';
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() styleType: 'outline' | 'fill' = 'fill';

  throwIconTypeError() {
    console.error(
      'Icons has to be from font-awesome icon starting with the "fa-" class, e.g fa-trash, fa-bug.'
    );
    alert(
      'Icons has to be from font-awesome icon starting with the "fa-" class, e.g fa-trash, fa-bug.'
    );
  }
}
