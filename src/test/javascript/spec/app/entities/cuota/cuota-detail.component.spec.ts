import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { CuotaDetailComponent } from 'app/entities/cuota/cuota-detail.component';
import { Cuota } from 'app/shared/model/cuota.model';

describe('Component Tests', () => {
  describe('Cuota Management Detail Component', () => {
    let comp: CuotaDetailComponent;
    let fixture: ComponentFixture<CuotaDetailComponent>;
    const route = ({ data: of({ cuota: new Cuota(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [CuotaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CuotaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CuotaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cuota on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cuota).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
