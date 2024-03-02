import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [],
  templateUrl: './panels.component.html',
  styleUrl: './panels.component.css',
})
export class PanelsComponent {
  @Input() fullscreen = false;
  @Input() collapse = true;
  @Input() titleBold = 'Bold';
  @Input() titleItalic = 'Italic';

  @Output() onDestroy = new EventEmitter<any>();

  panelToDelete: any = null;

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  storePanelToDeleteAndShowModal(e: any) {
    this.panelToDelete = e;
    const feedback = confirm('Do you want to delete me');

    if (feedback) {
      this.destroyPanel(this.panelToDelete);
    }
  }

  destroyPanel(e: any) {
    let parentDivFound = false;
    let currentNode = e.target;

    while (currentNode && !parentDivFound) {
      if (
        currentNode.tagName.toLowerCase() === 'div' &&
        currentNode.classList.contains('panel')
      ) {
        parentDivFound = true;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    if (parentDivFound) {
      currentNode.classList.remove('show');
      setTimeout(() => {
        currentNode.remove(); // Remove the closest ancestor div from the DOM
      }, 500);
    }

    this.onDestroy.emit();
  }
}
