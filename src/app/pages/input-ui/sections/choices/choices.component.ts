import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-choices',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.css',
})
export class ChoicesComponent {
  @Input() type: 'checkbox' | 'radio' = 'checkbox';
  @Input() options: { value: string; label: string }[] = [];
  @Input() name: string = '';

  @Input() label: string = 'Label';
  @Input() infoText: string = '';
  @Input() value: string | boolean | null = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() control = new FormControl();

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

  ngOnChanges(changes: SimpleChanges): void {
    this.previousLayout = this.layout;
    if (this.windowWidth < 992) {
      if (this.layout !== 'single') this.previousLayout = this.layout;
      this.layout = 'single';
    }
  }
}
