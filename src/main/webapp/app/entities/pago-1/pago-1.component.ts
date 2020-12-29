import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPago1 } from 'app/shared/model/pago-1.model';
import { Pago1Service } from './pago-1.service';
import { Pago1DeleteDialogComponent } from './pago-1-delete-dialog.component';

@Component({
  selector: 'jhi-pago-1',
  templateUrl: './pago-1.component.html',
})
export class Pago1Component implements OnInit, OnDestroy {
  pago1s?: IPago1[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected pago1Service: Pago1Service,
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
      this.pago1Service
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IPago1[]>) => (this.pago1s = res.body || []));
      return;
    }

    this.pago1Service.query().subscribe((res: HttpResponse<IPago1[]>) => (this.pago1s = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPago1s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPago1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPago1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('pago1ListModification', () => this.loadAll());
  }

  delete(pago1: IPago1): void {
    const modalRef = this.modalService.open(Pago1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pago1 = pago1;
  }
}
