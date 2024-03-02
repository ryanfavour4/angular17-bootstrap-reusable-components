import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() topNavFunctionFixed: boolean = false;
  @Output() toggleNavFunctionMinify = new EventEmitter<void>();

  currentUrl: string;
  topNavMarginMovement = 0;

  constructor(private el: ElementRef, private urlService: UrlService) {
    this.currentUrl = this.urlService.getCurrentUrl();
  }

  ngAfterViewInit() {
    const asideLinksNodeList: HTMLLIElement[] =
      this.el.nativeElement.querySelectorAll('.nav-menu > li:not(.nav-title)');

    // CHECK FOR ACTIVE ONES AND MAKE THEM IN "" THEN MAKE THE CURRENT ONE ACTIVE
    const showSideNavLinks = (e: MouseEvent, ele: HTMLLIElement) => {
      asideLinksNodeList.forEach((elements, idx) => {
        if (elements.className === 'active') elements.className = '';
        if (ele == elements) {
          elements.className = 'active';
        }
      });

      const childrenNodeList: HTMLLIElement[] =
        this.el.nativeElement.querySelectorAll(
          '.nav-menu > li.active:not(.nav-title) > ul li'
        );
      childrenNodeList.forEach((ele, idx) => {
        ele.addEventListener('click', (e: any) => {
          childrenNodeList.forEach((element, idx) => {
            if (element.className === 'active') element.className = '';
            if (ele == element) {
              element.className = 'active';
            }
          });
        });
      });
    };

    if (asideLinksNodeList.length) {
      asideLinksNodeList.forEach((ele, idx) => {
        ele.addEventListener('click', (e) => showSideNavLinks(e, ele));
      });
    }

    // SHOW THE ALREADY ACTIVE PAGE OPENED
    const asideNavMenuNodeList: HTMLLinkElement[] =
      this.el.nativeElement.querySelectorAll(
        '.nav-menu > li:not(.nav-title) ul > li > a'
      );

    asideNavMenuNodeList.forEach((aTag) => {
      if (aTag.href === this.currentUrl) {
        aTag.parentElement?.parentElement?.parentElement?.classList.add(
          'active'
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['topNavFunctionFixed'].currentValue) {
      this.topNavMarginMovement = 0;
    }
  }

  handleNavFunctionMinify() {
    this.toggleNavFunctionMinify.emit();
  }

  pushTopNav(position: 'left' | 'right') {
    if (position === 'left')
      this.topNavMarginMovement = this.topNavMarginMovement - 50;
    else if (position === 'right')
      this.topNavMarginMovement = this.topNavMarginMovement + 50;
  }
}
