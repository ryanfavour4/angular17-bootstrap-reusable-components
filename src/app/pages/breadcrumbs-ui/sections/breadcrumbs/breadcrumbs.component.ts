import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  pathsArray: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    const currentUrl = this.router.url;
    const pathSegments = currentUrl
      .split('/')
      .filter((segment) => segment !== '');
    this.pathsArray = pathSegments;
  }
}
