import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  imports: [],
})
export class AccordionComponent {
  @Input() tag = 'cb1';
  @Input() title = 'Accordion';
  constructor() {}
  ngOnInit() {}
}
