import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IPago2 } from 'app/shared/model/pago-2.model';

type EntityResponseType = HttpResponse<IPago2>;
type EntityArrayResponseType = HttpResponse<IPago2[]>;

@Injectable({ providedIn: 'root' })
export class Pago2Service {
  public resourceUrl = SERVER_API_URL + 'api/pago-2-s';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/pago-2-s';

  constructor(protected http: HttpClient) {}

  create(pago2: IPago2): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pago2);
    return this.http
      .post<IPago2>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pago2: IPago2): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pago2);
    return this.http
      .put<IPago2>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPago2>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPago2[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPago2[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(pago2: IPago2): IPago2 {
    const copy: IPago2 = Object.assign({}, pago2, {
      fecha2: pago2.fecha2 && pago2.fecha2.isValid() ? pago2.fecha2.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha2 = res.body.fecha2 ? moment(res.body.fecha2) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pago2: IPago2) => {
        pago2.fecha2 = pago2.fecha2 ? moment(pago2.fecha2) : undefined;
      });
    }
    return res;
  }
}
