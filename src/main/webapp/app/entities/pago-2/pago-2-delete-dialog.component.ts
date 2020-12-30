import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPago2 } from 'app/shared/model/pago-2.model';
import { Pago2Service } from './pago-2.service';

@Component({
  templateUrl: './pago-2-delete-dialog.component.html',
})
export class Pago2DeleteDialogComponent {
  pago2?: IPago2;

  constructor(protected pago2Service: Pago2Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pago2Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('pago2ListModification');
      this.activeModal.close();
    });
  }
}
