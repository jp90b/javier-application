import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';

@Component({
  templateUrl: './asociado-delete-dialog.component.html',
})
export class AsociadoDeleteDialogComponent {
  asociado?: IAsociado;

  constructor(protected asociadoService: AsociadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asociadoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('asociadoListModification');
      this.activeModal.close();
    });
  }
}
