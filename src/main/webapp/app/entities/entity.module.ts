import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'asociado',
        loadChildren: () => import('./asociado/asociado.module').then(m => m.Prueb0AsociadosAsociadoModule),
      },
      {
        path: 'cuota',
        loadChildren: () => import('./cuota/cuota.module').then(m => m.Prueb0AsociadosCuotaModule),
      },
      {
        path: 'pago-1',
        loadChildren: () => import('./pago-1/pago-1.module').then(m => m.Prueb0AsociadosPago1Module),
      },
      {
        path: 'pago-2',
        loadChildren: () => import('./pago-2/pago-2.module').then(m => m.Prueb0AsociadosPago2Module),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Prueb0AsociadosEntityModule {}
