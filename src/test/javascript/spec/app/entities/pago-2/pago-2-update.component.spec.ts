import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Prueb0AsociadosTestModule } from '../../../test.module';
import { Pago2UpdateComponent } from 'app/entities/pago-2/pago-2-update.component';
import { Pago2Service } from 'app/entities/pago-2/pago-2.service';
import { Pago2 } from 'app/shared/model/pago-2.model';

describe('Component Tests', () => {
  describe('Pago2 Management Update Component', () => {
    let comp: Pago2UpdateComponent;
    let fixture: ComponentFixture<Pago2UpdateComponent>;
    let service: Pago2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Prueb0AsociadosTestModule],
        declarations: [Pago2UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Pago2UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Pago2UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Pago2Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pago2(123);
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
        const entity = new Pago2();
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
