// layout.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  private navOpenSubject = new BehaviorSubject<boolean>(false);

  darkMode$ = this.darkModeSubject.asObservable();
  navOpen$ = this.navOpenSubject.asObservable();

  setDarkMode(value: boolean): void {
    this.darkModeSubject.next(value);
    // this.darkMode$.subscribe((val) => console.log(val));
  }

  setNavOpen(value: boolean): void {
    this.navOpenSubject.next(value);
  }
}
