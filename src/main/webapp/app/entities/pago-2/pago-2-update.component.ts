import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPago2, Pago2 } from 'app/shared/model/pago-2.model';
import { Pago2Service } from './pago-2.service';
import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from 'app/entities/asociado/asociado.service';

@Component({
  selector: 'jhi-pago-2-update',
  templateUrl: './pago-2-update.component.html',
})
export class Pago2UpdateComponent implements OnInit {
  isSaving = false;
  asociados: IAsociado[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad2: [],
    fecha2: [],
    asociado: [],
  });

  constructor(
    protected pago2Service: Pago2Service,
    protected asociadoService: AsociadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pago2 }) => {
      if (!pago2.id) {
        const today = moment().startOf('day');
        pago2.fecha2 = today;
      }

      this.updateForm(pago2);

      this.asociadoService.query().subscribe((res: HttpResponse<IAsociado[]>) => (this.asociados = res.body || []));
    });
  }

  updateForm(pago2: IPago2): void {
    this.editForm.patchValue({
      id: pago2.id,
      cantidad2: pago2.cantidad2,
      fecha2: pago2.fecha2 ? pago2.fecha2.format(DATE_TIME_FORMAT) : null,
      asociado: pago2.asociado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pago2 = this.createFromForm();
    if (pago2.id !== undefined) {
      this.subscribeToSaveResponse(this.pago2Service.update(pago2));
    } else {
      this.subscribeToSaveResponse(this.pago2Service.create(pago2));
    }
  }

  private createFromForm(): IPago2 {
    return {
      ...new Pago2(),
      id: this.editForm.get(['id'])!.value,
      cantidad2: this.editForm.get(['cantidad2'])!.value,
      fecha2: this.editForm.get(['fecha2'])!.value ? moment(this.editForm.get(['fecha2'])!.value, DATE_TIME_FORMAT) : undefined,
      asociado: this.editForm.get(['asociado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPago2>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAsociado): any {
    return item.id;
  }
}
