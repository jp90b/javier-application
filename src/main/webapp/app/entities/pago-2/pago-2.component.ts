import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPago2 } from 'app/shared/model/pago-2.model';
import { Pago2Service } from './pago-2.service';
import { Pago2DeleteDialogComponent } from './pago-2-delete-dialog.component';

@Component({
  selector: 'jhi-pago-2',
  templateUrl: './pago-2.component.html',
})
export class Pago2Component implements OnInit, OnDestroy {
  pago2s?: IPago2[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected pago2Service: Pago2Service,
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
      this.pago2Service
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IPago2[]>) => (this.pago2s = res.body || []));
      return;
    }

    this.pago2Service.query().subscribe((res: HttpResponse<IPago2[]>) => (this.pago2s = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPago2s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPago2): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPago2s(): void {
    this.eventSubscriber = this.eventManager.subscribe('pago2ListModification', () => this.loadAll());
  }

  delete(pago2: IPago2): void {
    const modalRef = this.modalService.open(Pago2DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pago2 = pago2;
  }
}
