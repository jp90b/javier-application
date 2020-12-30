import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAsociado, Asociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';
import { AsociadoComponent } from './asociado.component';
import { AsociadoDetailComponent } from './asociado-detail.component';
import { AsociadoUpdateComponent } from './asociado-update.component';

@Injectable({ providedIn: 'root' })
export class AsociadoResolve implements Resolve<IAsociado> {
  constructor(private service: AsociadoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsociado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((asociado: HttpResponse<Asociado>) => {
          if (asociado.body) {
            return of(asociado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Asociado());
  }
}

export const asociadoRoute: Routes = [
  {
    path: '',
    component: AsociadoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.asociado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsociadoDetailComponent,
    resolve: {
      asociado: AsociadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.asociado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsociadoUpdateComponent,
    resolve: {
      asociado: AsociadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.asociado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsociadoUpdateComponent,
    resolve: {
      asociado: AsociadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.asociado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
