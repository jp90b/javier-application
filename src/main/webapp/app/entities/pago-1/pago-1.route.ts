import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPago1, Pago1 } from 'app/shared/model/pago-1.model';
import { Pago1Service } from './pago-1.service';
import { Pago1Component } from './pago-1.component';
import { Pago1DetailComponent } from './pago-1-detail.component';
import { Pago1UpdateComponent } from './pago-1-update.component';

@Injectable({ providedIn: 'root' })
export class Pago1Resolve implements Resolve<IPago1> {
  constructor(private service: Pago1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPago1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pago1: HttpResponse<Pago1>) => {
          if (pago1.body) {
            return of(pago1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pago1());
  }
}

export const pago1Route: Routes = [
  {
    path: '',
    component: Pago1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Pago1DetailComponent,
    resolve: {
      pago1: Pago1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Pago1UpdateComponent,
    resolve: {
      pago1: Pago1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Pago1UpdateComponent,
    resolve: {
      pago1: Pago1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
