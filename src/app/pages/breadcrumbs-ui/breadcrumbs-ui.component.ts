import { Component } from '@angular/core';
import { BreadcrumbsComponent } from './sections/breadcrumbs/breadcrumbs.component';
import { LayoutComponent } from '../../layout/layout/layout.component';

@Component({
  selector: 'app-breadcrumbs-ui',
  standalone: true,
  templateUrl: './breadcrumbs-ui.component.html',
  styleUrl: './breadcrumbs-ui.component.css',
  imports: [BreadcrumbsComponent, LayoutComponent],
})
export class BreadcrumbsUiComponent {}
