import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago1DetailComponent } from 'app/entities/pago-1/pago-1-detail.component';
import { Pago1 } from 'app/shared/model/pago-1.model';

describe('Component Tests', () => {
  describe('Pago1 Management Detail Component', () => {
    let comp: Pago1DetailComponent;
    let fixture: ComponentFixture<Pago1DetailComponent>;
    const route = ({ data: of({ pago1: new Pago1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Pago1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Pago1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pago1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pago1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
