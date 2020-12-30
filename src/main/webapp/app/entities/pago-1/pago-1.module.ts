import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { Pago1Component } from './pago-1.component';
import { Pago1DetailComponent } from './pago-1-detail.component';
import { Pago1UpdateComponent } from './pago-1-update.component';
import { Pago1DeleteDialogComponent } from './pago-1-delete-dialog.component';
import { pago1Route } from './pago-1.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild(pago1Route)],
  declarations: [Pago1Component, Pago1DetailComponent, Pago1UpdateComponent, Pago1DeleteDialogComponent],
  entryComponents: [Pago1DeleteDialogComponent],
})
export class Prueb0AsociadosPago1Module {}
