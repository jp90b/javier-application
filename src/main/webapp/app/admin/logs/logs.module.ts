import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent],
})
export class LogsModule {}
