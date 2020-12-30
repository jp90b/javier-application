import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { Pago2Component } from './pago-2.component';
import { Pago2DetailComponent } from './pago-2-detail.component';
import { Pago2UpdateComponent } from './pago-2-update.component';
import { Pago2DeleteDialogComponent } from './pago-2-delete-dialog.component';
import { pago2Route } from './pago-2.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild(pago2Route)],
  declarations: [Pago2Component, Pago2DetailComponent, Pago2UpdateComponent, Pago2DeleteDialogComponent],
  entryComponents: [Pago2DeleteDialogComponent],
})
export class Prueb0AsociadosPago2Module {}
