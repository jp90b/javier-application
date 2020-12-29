import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago1Component } from 'app/entities/pago-1/pago-1.component';
import { Pago1Service } from 'app/entities/pago-1/pago-1.service';
import { Pago1 } from 'app/shared/model/pago-1.model';

describe('Component Tests', () => {
  describe('Pago1 Management Component', () => {
    let comp: Pago1Component;
    let fixture: ComponentFixture<Pago1Component>;
    let service: Pago1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago1Component],
      })
        .overrideTemplate(Pago1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Pago1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Pago1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pago1(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pago1s && comp.pago1s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
