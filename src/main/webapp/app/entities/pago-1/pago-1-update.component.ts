import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPago1, Pago1 } from 'app/shared/model/pago-1.model';
import { Pago1Service } from './pago-1.service';
import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from 'app/entities/asociado/asociado.service';

@Component({
  selector: 'jhi-pago-1-update',
  templateUrl: './pago-1-update.component.html',
})
export class Pago1UpdateComponent implements OnInit {
  isSaving = false;
  asociados: IAsociado[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad1: [],
    fecha1: [],
    asociado: [],
  });

  constructor(
    protected pago1Service: Pago1Service,
    protected asociadoService: AsociadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pago1 }) => {
      if (!pago1.id) {
        const today = moment().startOf('day');
        pago1.fecha1 = today;
      }

      this.updateForm(pago1);

      this.asociadoService.query().subscribe((res: HttpResponse<IAsociado[]>) => (this.asociados = res.body || []));
    });
  }

  updateForm(pago1: IPago1): void {
    this.editForm.patchValue({
      id: pago1.id,
      cantidad1: pago1.cantidad1,
      fecha1: pago1.fecha1 ? pago1.fecha1.format(DATE_TIME_FORMAT) : null,
      asociado: pago1.asociado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pago1 = this.createFromForm();
    if (pago1.id !== undefined) {
      this.subscribeToSaveResponse(this.pago1Service.update(pago1));
    } else {
      this.subscribeToSaveResponse(this.pago1Service.create(pago1));
    }
  }

  private createFromForm(): IPago1 {
    return {
      ...new Pago1(),
      id: this.editForm.get(['id'])!.value,
      cantidad1: this.editForm.get(['cantidad1'])!.value,
      fecha1: this.editForm.get(['fecha1'])!.value ? moment(this.editForm.get(['fecha1'])!.value, DATE_TIME_FORMAT) : undefined,
      asociado: this.editForm.get(['asociado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPago1>>): void {
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
