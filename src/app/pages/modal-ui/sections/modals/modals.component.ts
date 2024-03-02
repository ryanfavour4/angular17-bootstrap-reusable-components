import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.css',
})
export class ModalsComponent {
  @Input() direction: 'default' | 'top' | 'left' | 'centered' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() title: string = 'title';
  @Input() description: string = 'optional description';
  @Output() onClose = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  onCloseModal(e: any) {
    let parentDivFound = false;
    let currentNode = e.target;

    while (currentNode && !parentDivFound) {
      if (
        currentNode.tagName.toLowerCase() === 'div' &&
        currentNode.classList.contains('show')
      ) {
        parentDivFound = true;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    if (parentDivFound) {
      currentNode.classList.remove('show');
      setTimeout(() => {
        this.open = !this.open;
        this.openChange.emit(this.open);
      }, 500);
    }

    this.onClose.emit();
  }

  onSaveClick() {
    this.onSave.emit();
  }

  preventBubbling(event: Event): void {
    event.stopPropagation();
  }
}
