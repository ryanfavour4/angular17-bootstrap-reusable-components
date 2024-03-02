import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nginput',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nginput.component.html',
  styleUrl: './nginput.component.css',
})
export class NginputComponent {
  @Input() type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'date'
    | 'checkbox'
    | 'url'
    | 'tel'
    | 'search'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'file'
    | 'range'
    | 'radio'
    | 'color'
    | 'username'
    | 'hidden' = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() infoText: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() control: any = new FormControl();

  @Output() onChange: EventEmitter<HTMLInputElement> =
    new EventEmitter<HTMLInputElement>();
  @Output() onKeyUp: EventEmitter<HTMLInputElement> =
    new EventEmitter<HTMLInputElement>();
  @Input() class = '';
  @Input() inputClass = '';

  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  previousLayout = this.layout;
  windowWidth = window.innerWidth;
  inputClassName = '';

  constructor() {}

  changeValue(val: any) {
    this.onChange.emit(val);
    this.onKeyUp.emit(val);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chosenType = changes['type']?.currentValue;
    if (chosenType === 'range') {
      this.inputClassName = 'custom-range';
    } else {
      this.inputClassName = 'form-control';
    }
    this.previousLayout = this.layout;

    if (this.windowWidth < 992) {
      if (this.layout !== 'vertical') this.previousLayout = this.layout;
      this.layout = 'vertical';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992) {
      if (this.layout !== 'vertical') this.previousLayout = this.layout;
      this.layout = 'vertical';
    } else {
      this.layout = this.previousLayout;
    }
  }
}
