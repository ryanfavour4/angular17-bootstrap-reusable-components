import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import { ToastService } from '../../../../services/toast.service';
import { ButtonsComponent } from '../../../button-ui/sections/buttons/buttons.component';
import { PaginationsComponent } from './../../../pagination-ui/sections/paginations/paginations.component';
import { ModalAlertComponent } from '../../../modal-ui/sections/modal-alert/modal-alert.component';
import { ButtonUiComponent } from '../../../button-ui/button-ui.component';
import { ToastComponent } from '../../../toast-ui/sections/toast/toast.component';
import { IsObjectEmpty } from '../../../../../utils/isObjectEmpty';
import { JsonStringify } from '../../../../../utils/jsonStringify';

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
  imports: [
    CommonModule,
    PaginationsComponent,
    ButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalAlertComponent,
    ToastComponent,
    ButtonUiComponent,
  ],
})
export class TablesComponent {
  @Input() data: any[] = [];
  @Output() dataChange = new EventEmitter<any>();
  @Input() tableHead: any[] = [];
  @Input() title: string = '';
  @Input() uniqueColumn: number = 1;

  @Input() showButtons: boolean = false;

  @Input() formModalOpen: boolean = false;
  @Output() formModalOpenChange = new EventEmitter<boolean>();

  @Input() itemSelected: { [x: string]: string } | null = null;
  @Output() itemSelectedChange = new EventEmitter<any>();

  @Output() onAddButtonClicked = new EventEmitter<any>();
  @Output() onEditButtonClicked = new EventEmitter<any>();
  @Output() onModalButtonsClicked = new EventEmitter<{
    clicked: 'add' | 'edit';
    data: any;
  }>();

  @Input() itemsPerPage: number = 10;

  // UTILS
  objectEmpty = IsObjectEmpty;
  jsonStringify = JsonStringify;

  searchTerm = '';
  searchTermChange = (event: any) => (this.searchTerm = event.target.value);
  deleteConfirmModal = false;
  tablePopupOpen = false;
  tableDarkMode = false;
  tableSmall = false;
  isPrinting = false;
  dataKeys: string[] = [];
  orderByAsc = false;
  currentPage = 1;
  filteredData: any[] = this.data;
  get currentDataInView() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  //  ---------- ANGULAR PROVIDER FUNCTIONS -------------- //
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) this.dataKeys = Object?.keys(this?.data[0]);
    this.filteredData = this.data;
  }

  ngOnInit() {
    console.log(this.dataKeys);
  }

  constructor(private toast: ToastService) {}

  //  --------------- FUNCTIONS ------------- //
  sortByToggle(toggleKey: any, type: 'string' | 'number' | string) {
    const toggleByType = toggleKey;
    if (type == 'string') {
      this.sortByStringToggle(toggleByType);
    } else if (type == 'number') {
      this.sortByNumbersToggle(toggleByType);
    } else {
      alert(
        'Please enter a valid data type (string | number) ' +
          type.toString() +
          ' is not a valid data type'
      );
    }
  }

  sortByStringToggle(stringType: string) {
    if (this.orderByAsc) {
      this.filteredData.sort((a, b) =>
        b[stringType].localeCompare(a[stringType])
      );
      this.orderByAsc = !this.orderByAsc;
    } else {
      this.filteredData.sort((a, b) =>
        a[stringType].localeCompare(b[stringType])
      );
      this.orderByAsc = !this.orderByAsc;
    }
  }

  sortByNumbersToggle(numberType: number) {
    if (this.orderByAsc) {
      this.filteredData.sort((a, b) => a[numberType] - b[numberType]);
      this.orderByAsc = !this.orderByAsc;
    } else {
      this.filteredData.sort((a, b) => b[numberType] - a[numberType]);
      this.orderByAsc = !this.orderByAsc;
    }
  }

  onSubmitSearch() {
    const newDataList: any[] = [];
    if (this.searchTerm && this.searchTerm.length > 2) {
      this.data.filter((val) => {
        this.dataKeys.map((key) => {
          if (
            val[key]
              .toString()
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          ) {
            newDataList.push(val);
          }
        });
      });
      this.filteredData = newDataList;
    } else if (this.searchTerm == '') {
      this.filteredData = this.data;
    }
  }

  onRowSelected(row: any) {
    this.itemSelected = row;
    this.deleteConfirmModal = false;
    this.itemSelectedChange.emit(row);
  }

  openDeleteConfirmModal() {
    if (this.itemSelected) this.deleteConfirmModal = true;
  }

  onRowDelete() {
    this.data = this.data.filter((values) => {
      return (
        this.jsonStringify(values) !== this.jsonStringify(this.itemSelected)
      );
    });
    this.toast.alert('Row Deleted!');
    this.filteredData = this.data;
    this.deleteConfirmModal = false;
    this.itemSelected = null;
    this.dataChange.emit(this.data);
  }

  toggleFormModalOpen(val: 'add' | 'edit' = 'add') {
    this.formModalOpen = !this.formModalOpen;
    if (val == 'add') {
      this.itemSelected = null;
      this.onAddButtonClicked.emit();
    } else if (val == 'edit') {
      this.onEditButtonClicked.emit(this.itemSelected);
    }
    this.onModalButtonsClicked.emit({ clicked: val, data: this.itemSelected });
  }

  toggleTablePopup() {
    this.tablePopupOpen = !this.tablePopupOpen;
  }

  toggleTableDarkMode() {
    this.tableDarkMode = !this.tableDarkMode;
  }

  toggleTableSmall() {
    this.tableSmall = !this.tableSmall;
  }

  exportToCSV = () => {
    const csvHeaders = this.tableHead.map((head) => head.title);
    const csvContent =
      csvHeaders.join(',') +
      '\n' +
      this.data
        .map((row) => `${this.dataKeys.map((key) => row[key]) + ','}`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'data.csv';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  exportToPdf = () => {
    const pdf = new jsPDF();

    // Add title
    pdf.text('My PDF Title', 20, 10);

    const keys = Object.keys(this.data[0]);

    const tableData = this.data.map((row) => keys.map((key) => row[key]));

    // Add table using autoTable plugin
    autoTable(pdf, {
      head: [this.tableHead.map((head) => head.title)],
      body: [...tableData],
      startY: 20,
      theme: 'grid',
    });

    pdf.save('MyPDF.pdf');
  };

  printTable = () => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
    
          td,
          th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
    
          tr:nth-child(even) {
            background-color: #dddddd;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${this.tableHead
                .map(
                  (item) => `
              <th>${item.title}</th>
              `
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            ${this.data
              .map(
                (data) => `
            <tr>
              ${this.dataKeys
                .map(
                  (item) => `
              <td>${data[item]}</td>
              `
                )
                .join('')}
            </tr>
            `
              )
              .join('')}
          </tbody>
          <tfoot>
            <tr>
              ${this.tableHead
                .map(
                  (item) => `
              <th>${item.title}</th>
              `
                )
                .join('')}
            </tr>
          </tfoot>
        </table>
    
        <script>
        window.print();
        setTimeout(() => {
          window.close();
        }, 100);
        </script>
      </body>
    </html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    URL.revokeObjectURL(blobUrl);
  };

  copyDataToClipboard = () => {
    const csvHeaders = this.tableHead.map((head) => head.title);
    const csvContent =
      csvHeaders.join('     ') +
      '\n' +
      this.data
        .map((row) => `${this.dataKeys.map((key) => row[key]) + '.'}`)
        .join('\n');
    window.navigator.clipboard.writeText(csvContent);

    this.toast.alert('Copied to clipboard');
  };

  preventBubbling(event: Event): void {
    event.stopPropagation();
  }
}
