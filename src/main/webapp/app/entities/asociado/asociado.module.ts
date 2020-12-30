import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { AsociadoComponent } from './asociado.component';
import { AsociadoDetailComponent } from './asociado-detail.component';
import { AsociadoUpdateComponent } from './asociado-update.component';
import { AsociadoDeleteDialogComponent } from './asociado-delete-dialog.component';
import { asociadoRoute } from './asociado.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild(asociadoRoute)],
  declarations: [AsociadoComponent, AsociadoDetailComponent, AsociadoUpdateComponent, AsociadoDeleteDialogComponent],
  entryComponents: [AsociadoDeleteDialogComponent],
})
export class Prueb0AsociadosAsociadoModule {}
