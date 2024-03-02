import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  getCurrentUrl(): string {
    return window.location.href;
  }
}
