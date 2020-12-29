import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAsociado, Asociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';

@Component({
  selector: 'jhi-asociado-update',
  templateUrl: './asociado-update.component.html',
})
export class AsociadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellidos: [],
    email: [],
    acciones: [],
    bonos: [],
  });

  constructor(protected asociadoService: AsociadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asociado }) => {
      this.updateForm(asociado);
    });
  }

  updateForm(asociado: IAsociado): void {
    this.editForm.patchValue({
      id: asociado.id,
      nombre: asociado.nombre,
      apellidos: asociado.apellidos,
      email: asociado.email,
      acciones: asociado.acciones,
      bonos: asociado.bonos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const asociado = this.createFromForm();
    if (asociado.id !== undefined) {
      this.subscribeToSaveResponse(this.asociadoService.update(asociado));
    } else {
      this.subscribeToSaveResponse(this.asociadoService.create(asociado));
    }
  }

  private createFromForm(): IAsociado {
    return {
      ...new Asociado(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidos: this.editForm.get(['apellidos'])!.value,
      email: this.editForm.get(['email'])!.value,
      acciones: this.editForm.get(['acciones'])!.value,
      bonos: this.editForm.get(['bonos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsociado>>): void {
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
}
