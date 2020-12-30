import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { CuotaUpdateComponent } from 'app/entities/cuota/cuota-update.component';
import { CuotaService } from 'app/entities/cuota/cuota.service';
import { Cuota } from 'app/shared/model/cuota.model';

describe('Component Tests', () => {
  describe('Cuota Management Update Component', () => {
    let comp: CuotaUpdateComponent;
    let fixture: ComponentFixture<CuotaUpdateComponent>;
    let service: CuotaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [CuotaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CuotaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CuotaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CuotaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cuota(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cuota();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
