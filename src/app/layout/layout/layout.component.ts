import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  @Input() titleBold = 'Analytics ';
  @Input() titleSlim = 'Dashboard';
  navFunctionFixed = false;
  mobileNavFunctionFixed = false;
  navFunctionHidden = false;
  navFunctionMinify = false;
  topNavFunctionFixed = false;

  constructor() {}

  ngOnInit() {}

  toggleNavFunctionFixed() {
    this.navFunctionFixed = !this.navFunctionFixed;
  }

  toggleMobileNavFunctionHidden() {
    this.mobileNavFunctionFixed = !this.mobileNavFunctionFixed;
  }

  toggleNavFunctionHidden() {
    this.navFunctionHidden = !this.navFunctionHidden;
  }

  toggleNavFunctionMinify() {
    this.navFunctionMinify = !this.navFunctionMinify;
  }

  toggleTopFunctionFixed() {
    this.topNavFunctionFixed = !this.topNavFunctionFixed;
  }
}
