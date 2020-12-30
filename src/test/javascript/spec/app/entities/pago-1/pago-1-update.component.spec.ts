import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago1UpdateComponent } from 'app/entities/pago-1/pago-1-update.component';
import { Pago1Service } from 'app/entities/pago-1/pago-1.service';
import { Pago1 } from 'app/shared/model/pago-1.model';

describe('Component Tests', () => {
  describe('Pago1 Management Update Component', () => {
    let comp: Pago1UpdateComponent;
    let fixture: ComponentFixture<Pago1UpdateComponent>;
    let service: Pago1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Pago1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Pago1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Pago1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pago1(123);
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
        const entity = new Pago1();
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
