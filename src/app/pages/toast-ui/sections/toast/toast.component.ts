import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  message: string | null = null;
  date = new Date();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 5000); // Set a timeout for the toast to disappear
    });
  }

  close() {
    this.message = null;
  }

  get timeNow() {
    return this.hours + ':' + this.minutes;
  }
  get hours() {
    return new Date().getHours();
  }

  get minutes() {
    return new Date().getMinutes();
  }
}
