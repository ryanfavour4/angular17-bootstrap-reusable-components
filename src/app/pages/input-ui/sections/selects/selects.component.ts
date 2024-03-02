import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-selects',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './selects.component.html',
  styleUrl: './selects.component.css',
})
export class SelectsComponent {
  @Input() options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
  ];
  @Input() selectedOptions: { value: string; label: string }[] = [];
  @Input() name: string = '';

  @Input() label: string = 'Label';
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

  @Input() layout: 'single' | 'multiple' = 'single';

  previousLayout = this.layout;
  windowWidth = window.innerWidth;
  inputClassName = '';

  constructor() {}

  changeValue(val: any) {
    this.onChange.emit(val);
    this.onKeyUp.emit(val);
  }

  ngAfterViewInit() {
    console.log(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.previousLayout = this.layout;

    if (this.windowWidth < 992) {
      if (this.layout !== 'single') this.previousLayout = this.layout;
      this.layout = 'single';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992) {
      if (this.layout !== 'single') this.previousLayout = this.layout;
      this.layout = 'single';
    } else {
      this.layout = this.previousLayout;
    }
  }
}
