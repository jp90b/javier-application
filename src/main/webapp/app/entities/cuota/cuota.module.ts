import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { CuotaComponent } from './cuota.component';
import { CuotaDetailComponent } from './cuota-detail.component';
import { CuotaUpdateComponent } from './cuota-update.component';
import { CuotaDeleteDialogComponent } from './cuota-delete-dialog.component';
import { cuotaRoute } from './cuota.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild(cuotaRoute)],
  declarations: [CuotaComponent, CuotaDetailComponent, CuotaUpdateComponent, CuotaDeleteDialogComponent],
  entryComponents: [CuotaDeleteDialogComponent],
})
export class Prueb0AsociadosCuotaModule {}
