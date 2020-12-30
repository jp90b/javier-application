import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago2DetailComponent } from 'app/entities/pago-2/pago-2-detail.component';
import { Pago2 } from 'app/shared/model/pago-2.model';

describe('Component Tests', () => {
  describe('Pago2 Management Detail Component', () => {
    let comp: Pago2DetailComponent;
    let fixture: ComponentFixture<Pago2DetailComponent>;
    const route = ({ data: of({ pago2: new Pago2(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago2DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Pago2DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Pago2DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pago2 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pago2).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
