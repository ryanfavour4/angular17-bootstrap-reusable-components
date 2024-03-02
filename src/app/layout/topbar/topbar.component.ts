import { Component, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  providers: [LayoutService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Output() toggleNavFunctionFixed = new EventEmitter<void>();
  @Output() toggleMobileNavFunctionHidden = new EventEmitter<void>();
  @Output() toggleNavFunctionHidden = new EventEmitter<void>();
  @Output() toggleNavFunctionMinify = new EventEmitter<void>();
  @Output() toggleTopFunctionFixed = new EventEmitter<void>();

  darkMode: any;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.toggleDarkMode();
    this.layoutService.darkMode$.subscribe(
      (val) => (this.darkMode = val)
    ) as unknown as boolean;
  }

  toggleDarkMode(): void {
    this.layoutService.setDarkMode(!this.darkMode);
  }

  handleNavFunctionFixed() {
    this.toggleNavFunctionFixed.emit();
  }

  handleMobileNavFunctionHidden() {
    this.toggleMobileNavFunctionHidden.emit();
  }

  handleNavFunctionHidden() {
    this.toggleNavFunctionHidden.emit();
  }

  handleNavFunctionMinify() {
    this.toggleNavFunctionMinify.emit();
  }

  handleTopNavFunctionFixed() {
    this.toggleTopFunctionFixed.emit();
  }
}
