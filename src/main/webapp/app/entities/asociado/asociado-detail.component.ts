import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsociado } from 'app/shared/model/asociado.model';

@Component({
  selector: 'jhi-asociado-detail',
  templateUrl: './asociado-detail.component.html',
})
export class AsociadoDetailComponent implements OnInit {
  asociado: IAsociado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asociado }) => (this.asociado = asociado));
  }

  previousState(): void {
    window.history.back();
  }
}
