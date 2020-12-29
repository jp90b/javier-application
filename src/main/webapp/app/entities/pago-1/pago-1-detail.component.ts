import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPago1 } from 'app/shared/model/pago-1.model';

@Component({
  selector: 'jhi-pago-1-detail',
  templateUrl: './pago-1-detail.component.html',
})
export class Pago1DetailComponent implements OnInit {
  pago1: IPago1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pago1 }) => (this.pago1 = pago1));
  }

  previousState(): void {
    window.history.back();
  }
}
