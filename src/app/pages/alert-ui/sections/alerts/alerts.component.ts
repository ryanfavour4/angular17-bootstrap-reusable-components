import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
})
export class AlertsComponent {
  @Input()
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'dark'
    | 'light' = 'primary';

  @Input() delIcon:
    | 'x'
    | 'fa-times'
    | 'fa-times-square'
    | 'fa-trash-alt'
    | 'fa-times-circle'
    | 'fa-window-close' = 'fa-times';

  @Input() colorStyle: 'basic' | 'outline' | 'fill' = 'basic';
  @Input() type: 'default' | 'stack' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  @Input() dismissible: 'true' | 'false' = 'false';
  @Input() icon: string = 'fa-user';
  @Input() title: string = 'title';
  @Input() message: string = 'message';

  @Output() onClose = new EventEmitter<any>();

  onCloseAlert(e: any) {
    let parentDivFound = false;
    let currentNode = e.target;

    while (currentNode && !parentDivFound) {
      if (currentNode.tagName.toLowerCase() === 'div') {
        parentDivFound = true;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    if (parentDivFound && currentNode.classList.contains('show')) {
      currentNode.classList.remove('show');
      setTimeout(() => {
        currentNode.classList.add('d-none');
        // currentNode.remove(); // Remove the closest ancestor div from the DOM
      }, 500);
    }

    this.onClose.emit();
  }
}
