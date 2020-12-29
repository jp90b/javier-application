import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPago2, Pago2 } from 'app/shared/model/pago-2.model';
import { Pago2Service } from './pago-2.service';
import { Pago2Component } from './pago-2.component';
import { Pago2DetailComponent } from './pago-2-detail.component';
import { Pago2UpdateComponent } from './pago-2-update.component';

@Injectable({ providedIn: 'root' })
export class Pago2Resolve implements Resolve<IPago2> {
  constructor(private service: Pago2Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPago2> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pago2: HttpResponse<Pago2>) => {
          if (pago2.body) {
            return of(pago2.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pago2());
  }
}

export const pago2Route: Routes = [
  {
    path: '',
    component: Pago2Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Pago2DetailComponent,
    resolve: {
      pago2: Pago2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Pago2UpdateComponent,
    resolve: {
      pago2: Pago2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Pago2UpdateComponent,
    resolve: {
      pago2: Pago2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'prueb0AsociadosApp.pago2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
