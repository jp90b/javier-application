import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AsociadoService } from 'app/entities/asociado/asociado.service';
import { IAsociado, Asociado } from 'app/shared/model/asociado.model';

describe('Service Tests', () => {
  describe('Asociado Service', () => {
    let injector: TestBed;
    let service: AsociadoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAsociado;
    let expectedResult: IAsociado | IAsociado[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AsociadoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Asociado(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Asociado', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Asociado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Asociado', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            apellidos: 'BBBBBB',
            email: 'BBBBBB',
            acciones: true,
            bonos: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Asociado', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            apellidos: 'BBBBBB',
            email: 'BBBBBB',
            acciones: true,
            bonos: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Asociado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
