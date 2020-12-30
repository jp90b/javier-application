import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICuota } from 'app/shared/model/cuota.model';
import { CuotaService } from './cuota.service';
import { CuotaDeleteDialogComponent } from './cuota-delete-dialog.component';

@Component({
  selector: 'jhi-cuota',
  templateUrl: './cuota.component.html',
})
export class CuotaComponent implements OnInit, OnDestroy {
  cuotas?: ICuota[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected cuotaService: CuotaService,
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
      this.cuotaService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ICuota[]>) => (this.cuotas = res.body || []));
      return;
    }

    this.cuotaService.query().subscribe((res: HttpResponse<ICuota[]>) => (this.cuotas = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCuotas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICuota): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCuotas(): void {
    this.eventSubscriber = this.eventManager.subscribe('cuotaListModification', () => this.loadAll());
  }

  delete(cuota: ICuota): void {
    const modalRef = this.modalService.open(CuotaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cuota = cuota;
  }
}
