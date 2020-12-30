import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPago2 } from 'app/shared/model/pago-2.model';

@Component({
  selector: 'jhi-pago-2-detail',
  templateUrl: './pago-2-detail.component.html',
})
export class Pago2DetailComponent implements OnInit {
  pago2: IPago2 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pago2 }) => (this.pago2 = pago2));
  }

  previousState(): void {
    window.history.back();
  }
}
