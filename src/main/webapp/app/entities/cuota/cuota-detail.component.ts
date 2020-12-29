import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICuota } from 'app/shared/model/cuota.model';

@Component({
  selector: 'jhi-cuota-detail',
  templateUrl: './cuota-detail.component.html',
})
export class CuotaDetailComponent implements OnInit {
  cuota: ICuota | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cuota }) => (this.cuota = cuota));
  }

  previousState(): void {
    window.history.back();
  }
}
