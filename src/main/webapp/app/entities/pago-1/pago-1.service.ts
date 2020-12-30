import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IPago1 } from 'app/shared/model/pago-1.model';

type EntityResponseType = HttpResponse<IPago1>;
type EntityArrayResponseType = HttpResponse<IPago1[]>;

@Injectable({ providedIn: 'root' })
export class Pago1Service {
  public resourceUrl = SERVER_API_URL + 'api/pago-1-s';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/pago-1-s';

  constructor(protected http: HttpClient) {}

  create(pago1: IPago1): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pago1);
    return this.http
      .post<IPago1>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pago1: IPago1): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pago1);
    return this.http
      .put<IPago1>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPago1>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPago1[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPago1[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(pago1: IPago1): IPago1 {
    const copy: IPago1 = Object.assign({}, pago1, {
      fecha1: pago1.fecha1 && pago1.fecha1.isValid() ? pago1.fecha1.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha1 = res.body.fecha1 ? moment(res.body.fecha1) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pago1: IPago1) => {
        pago1.fecha1 = pago1.fecha1 ? moment(pago1.fecha1) : undefined;
      });
    }
    return res;
  }
}
