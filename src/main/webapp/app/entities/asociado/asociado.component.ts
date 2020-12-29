import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';
import { AsociadoDeleteDialogComponent } from './asociado-delete-dialog.component';

@Component({
  selector: 'jhi-asociado',
  templateUrl: './asociado.component.html',
})
export class AsociadoComponent implements OnInit, OnDestroy {
  asociados?: IAsociado[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected asociadoService: AsociadoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.asociadoService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IAsociado[]>) => (this.asociados = res.body || []));
      return;
    }

    this.asociadoService.query().subscribe((res: HttpResponse<IAsociado[]>) => (this.asociados = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAsociados();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAsociado): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAsociados(): void {
    this.eventSubscriber = this.eventManager.subscribe('asociadoListModification', () => this.loadAll());
  }

  delete(asociado: IAsociado): void {
    const modalRef = this.modalService.open(AsociadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asociado = asociado;
  }
}
