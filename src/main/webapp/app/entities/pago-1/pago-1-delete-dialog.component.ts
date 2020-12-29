import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPago1 } from 'app/shared/model/pago-1.model';
import { Pago1Service } from './pago-1.service';

@Component({
  templateUrl: './pago-1-delete-dialog.component.html',
})
export class Pago1DeleteDialogComponent {
  pago1?: IPago1;

  constructor(protected pago1Service: Pago1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pago1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('pago1ListModification');
      this.activeModal.close();
    });
  }
}
