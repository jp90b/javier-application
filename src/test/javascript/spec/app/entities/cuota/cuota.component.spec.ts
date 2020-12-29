import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { CuotaComponent } from 'app/entities/cuota/cuota.component';
import { CuotaService } from 'app/entities/cuota/cuota.service';
import { Cuota } from 'app/shared/model/cuota.model';

describe('Component Tests', () => {
  describe('Cuota Management Component', () => {
    let comp: CuotaComponent;
    let fixture: ComponentFixture<CuotaComponent>;
    let service: CuotaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [CuotaComponent],
      })
        .overrideTemplate(CuotaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CuotaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CuotaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cuota(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cuotas && comp.cuotas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
