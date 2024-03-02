import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonsComponent } from '../../../button-ui/sections/buttons/buttons.component';

@Component({
  selector: 'app-paginations',
  standalone: true,
  imports: [ButtonsComponent],
  templateUrl: './paginations.component.html',
  styleUrl: './paginations.component.css',
})
export class PaginationsComponent {
  //  --------- PROPS -------------- //
  @Input() totalDataLength: number = 0;
  @Input() rowsPerPage: number = 10; // REQUIRED, TWO WAY BINDINGS
  @Output() rowsPerPageChange = new EventEmitter<number>();
  @Input() currentPage: number = 1; // REQUIRED, TWO WAY BINDINGS
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() onPageChange = new EventEmitter<string>();

  //  ---------- VARIABLES -------------- //
  totalPages = Math.ceil(this.totalDataLength / this.rowsPerPage);

  //  ---------- GETTERS -------------- //
  get pageNumbers() {
    const tempArr = [];
    for (let i = 0; i < this.totalPages; i++) {
      tempArr.push(i + 1);
    }
    return tempArr;
  }

  get startIndex() {
    return (this.currentPage - 1) * this.rowsPerPage;
  }

  get endIndex() {
    return Math.min(this.currentPage * this.rowsPerPage, this.totalDataLength);
  }

  //  ---------- ANGULAR PROVIDER FUNCTIONS -------------- //
  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.totalDataLength / this.rowsPerPage);
  }

  //  ---------- CUSTOM FUNCTIONS -------------- //
  changePage(action: string) {
    if (action === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    } else if (action === 'next' && this.currentPage < this.totalDataLength) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }

    this.onPageChange.emit(action);
  }

  gotoPage(number: number) {
    this.currentPage = number;
    this.currentPageChange.emit(this.currentPage);
  }
}
