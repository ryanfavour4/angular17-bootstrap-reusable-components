import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() infoText: string = '';
  @Input() value: string = '';
  @Input() rows: number = 3;
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

  constructor() {}

  changeValue(val: any) {
    this.onChange.emit(val);
    this.onKeyUp.emit(val);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chosenType = changes['type']?.currentValue;
  }
}
