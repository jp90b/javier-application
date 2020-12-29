import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent],
})
export class AuditsModule {}
