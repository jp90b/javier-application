import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago2Component } from 'app/entities/pago-2/pago-2.component';
import { Pago2Service } from 'app/entities/pago-2/pago-2.service';
import { Pago2 } from 'app/shared/model/pago-2.model';

describe('Component Tests', () => {
  describe('Pago2 Management Component', () => {
    let comp: Pago2Component;
    let fixture: ComponentFixture<Pago2Component>;
    let service: Pago2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago2Component],
      })
        .overrideTemplate(Pago2Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Pago2Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Pago2Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pago2(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pago2s && comp.pago2s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
