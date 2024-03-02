import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make it available anywhere in the app
})
export class ToastService {
  private toastSubject = new Subject<string>();

  toast$ = this.toastSubject.asObservable();

  alert(message: string) {
    this.toastSubject.next(message);
  }

  success(message: string, variant: 'success') {
    this.toastSubject.next(message);
  }
}
