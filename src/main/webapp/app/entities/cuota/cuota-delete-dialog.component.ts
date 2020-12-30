import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICuota } from 'app/shared/model/cuota.model';
import { CuotaService } from './cuota.service';

@Component({
  templateUrl: './cuota-delete-dialog.component.html',
})
export class CuotaDeleteDialogComponent {
  cuota?: ICuota;

  constructor(protected cuotaService: CuotaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cuotaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cuotaListModification');
      this.activeModal.close();
    });
  }
}
