import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ICuota } from 'app/shared/model/cuota.model';

type EntityResponseType = HttpResponse<ICuota>;
type EntityArrayResponseType = HttpResponse<ICuota[]>;

@Injectable({ providedIn: 'root' })
export class CuotaService {
  public resourceUrl = SERVER_API_URL + 'api/cuotas';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/cuotas';

  constructor(protected http: HttpClient) {}

  create(cuota: ICuota): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cuota);
    return this.http
      .post<ICuota>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cuota: ICuota): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cuota);
    return this.http
      .put<ICuota>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICuota>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICuota[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICuota[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(cuota: ICuota): ICuota {
    const copy: ICuota = Object.assign({}, cuota, {
      fecha2019Q: cuota.fecha2019Q && cuota.fecha2019Q.isValid() ? cuota.fecha2019Q.toJSON() : undefined,
      fecha2020Q: cuota.fecha2020Q && cuota.fecha2020Q.isValid() ? cuota.fecha2020Q.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha2019Q = res.body.fecha2019Q ? moment(res.body.fecha2019Q) : undefined;
      res.body.fecha2020Q = res.body.fecha2020Q ? moment(res.body.fecha2020Q) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cuota: ICuota) => {
        cuota.fecha2019Q = cuota.fecha2019Q ? moment(cuota.fecha2019Q) : undefined;
        cuota.fecha2020Q = cuota.fecha2020Q ? moment(cuota.fecha2020Q) : undefined;
      });
    }
    return res;
  }
}
