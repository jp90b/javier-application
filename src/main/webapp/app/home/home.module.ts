import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class Prueb0AsociadosHomeModule {}
