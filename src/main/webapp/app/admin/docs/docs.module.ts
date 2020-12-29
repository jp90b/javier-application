import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [Prueb0AsociadosSharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent],
})
export class DocsModule {}
