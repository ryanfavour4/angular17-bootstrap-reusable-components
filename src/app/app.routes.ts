import { Routes } from '@angular/router';
import { ButtonUiComponent } from './pages/button-ui/button-ui.component';
import { AlertUiComponent } from './pages/alert-ui/alert-ui.component';
import { ModalUiComponent } from './pages/modal-ui/modal-ui.component';
import { ToastUiComponent } from './pages/toast-ui/toast-ui.component';
import { PanelUiComponent } from './pages/panel-ui/panel-ui.component';
import { LabelUiComponent } from './pages/label-ui/label-ui.component';
import { InputUiComponent } from './pages/input-ui/input-ui.component';
import { BreadcrumbsUiComponent } from './pages/breadcrumbs-ui/breadcrumbs-ui.component';
import { TableUiComponent } from './pages/table-ui/table-ui.component';
import { ReactiveFormUiComponent } from './pages/reactive-form-ui/reactive-form-ui.component';

export const routes: Routes = [
  { path: '', component: ButtonUiComponent },
  {
    path: 'ui-components/alerts',
    component: AlertUiComponent,
  },
  { path: 'ui-components/breadcrumbs', component: BreadcrumbsUiComponent },
  { path: 'ui-components/buttons', component: ButtonUiComponent },
  { path: 'ui-components/labels', component: LabelUiComponent },
  {
    path: 'ui-components/modals',
    component: ModalUiComponent,
  },
  {
    path: 'ui-components/panels',
    component: PanelUiComponent,
  },
  {
    path: 'ui-components/toast',
    component: ToastUiComponent,
  },
  {
    path: 'form-stuff/inputs',
    component: InputUiComponent,
  },
  {
    path: 'form-stuff/ng-form',
    component: ReactiveFormUiComponent,
  },
  {
    path: 'data-tables/basic',
    component: TableUiComponent,
  },
  {
    path: '**',
    component: ReactiveFormUiComponent,
  },
];
