import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.css',
})
export class ModalAlertComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() onCloseAlert = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Input() title: string = 'title';
  @Input() description: string = 'description';

  private notificationAudio = new Audio('/assets/audio/Slack-Hi.mp3');

  ngOnChanges(changes: SimpleChanges): void {
    const openStateChange = changes['open'];

    if (openStateChange && openStateChange.currentValue) {
      // The modal is opening, play the notification sound
      this.notificationAudio.play();
    }
  }

  onCloseModalAlert(e: any) {
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

    this.onCloseAlert.emit();
  }

  onSaveClick() {
    this.onSave.emit();
  }

  preventBubbling(event: Event): void {
    event.stopPropagation();
  }
}
