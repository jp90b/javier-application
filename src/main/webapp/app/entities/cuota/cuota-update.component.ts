import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICuota, Cuota } from 'app/shared/model/cuota.model';
import { CuotaService } from './cuota.service';
import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from 'app/entities/asociado/asociado.service';

@Component({
  selector: 'jhi-cuota-update',
  templateUrl: './cuota-update.component.html',
})
export class CuotaUpdateComponent implements OnInit {
  isSaving = false;
  asociados: IAsociado[] = [];

  editForm = this.fb.group({
    id: [],
    abono2019: [],
    abono2019Q: [],
    fecha2019Q: [],
    abono2020: [],
    abono2020Q: [],
    fecha2020Q: [],
    asociado: [],
  });

  constructor(
    protected cuotaService: CuotaService,
    protected asociadoService: AsociadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cuota }) => {
      if (!cuota.id) {
        const today = moment().startOf('day');
        cuota.fecha2019Q = today;
        cuota.fecha2020Q = today;
      }

      this.updateForm(cuota);

      this.asociadoService.query().subscribe((res: HttpResponse<IAsociado[]>) => (this.asociados = res.body || []));
    });
  }

  updateForm(cuota: ICuota): void {
    this.editForm.patchValue({
      id: cuota.id,
      abono2019: cuota.abono2019,
      abono2019Q: cuota.abono2019Q,
      fecha2019Q: cuota.fecha2019Q ? cuota.fecha2019Q.format(DATE_TIME_FORMAT) : null,
      abono2020: cuota.abono2020,
      abono2020Q: cuota.abono2020Q,
      fecha2020Q: cuota.fecha2020Q ? cuota.fecha2020Q.format(DATE_TIME_FORMAT) : null,
      asociado: cuota.asociado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cuota = this.createFromForm();
    if (cuota.id !== undefined) {
      this.subscribeToSaveResponse(this.cuotaService.update(cuota));
    } else {
      this.subscribeToSaveResponse(this.cuotaService.create(cuota));
    }
  }

  private createFromForm(): ICuota {
    return {
      ...new Cuota(),
      id: this.editForm.get(['id'])!.value,
      abono2019: this.editForm.get(['abono2019'])!.value,
      abono2019Q: this.editForm.get(['abono2019Q'])!.value,
      fecha2019Q: this.editForm.get(['fecha2019Q'])!.value ? moment(this.editForm.get(['fecha2019Q'])!.value, DATE_TIME_FORMAT) : undefined,
      abono2020: this.editForm.get(['abono2020'])!.value,
      abono2020Q: this.editForm.get(['abono2020Q'])!.value,
      fecha2020Q: this.editForm.get(['fecha2020Q'])!.value ? moment(this.editForm.get(['fecha2020Q'])!.value, DATE_TIME_FORMAT) : undefined,
      asociado: this.editForm.get(['asociado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICuota>>): void {
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
