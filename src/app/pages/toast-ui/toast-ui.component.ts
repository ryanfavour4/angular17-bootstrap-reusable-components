import { Component } from '@angular/core';
import { ToastComponent } from './sections/toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { ButtonsComponent } from '../button-ui/sections/buttons/buttons.component';
import { LayoutComponent } from '../../layout/layout/layout.component';

@Component({
  selector: 'app-toast-ui',
  standalone: true,
  templateUrl: './toast-ui.component.html',
  styleUrl: './toast-ui.component.css',
  imports: [ToastComponent, ButtonsComponent, LayoutComponent],
})
export class ToastUiComponent {
  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.alert('Booking successful!');
  }
}
