import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CuotaService } from 'app/entities/cuota/cuota.service';
import { ICuota, Cuota } from 'app/shared/model/cuota.model';

describe('Service Tests', () => {
  describe('Cuota Service', () => {
    let injector: TestBed;
    let service: CuotaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICuota;
    let expectedResult: ICuota | ICuota[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CuotaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cuota(0, false, 0, currentDate, false, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha2019Q: currentDate.format(DATE_TIME_FORMAT),
            fecha2020Q: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cuota', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha2019Q: currentDate.format(DATE_TIME_FORMAT),
            fecha2020Q: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha2019Q: currentDate,
            fecha2020Q: currentDate,
          },
          returnedFromService
        );

        service.create(new Cuota()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cuota', () => {
        const returnedFromService = Object.assign(
          {
            abono2019: true,
            abono2019Q: 1,
            fecha2019Q: currentDate.format(DATE_TIME_FORMAT),
            abono2020: true,
            abono2020Q: 1,
            fecha2020Q: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha2019Q: currentDate,
            fecha2020Q: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cuota', () => {
        const returnedFromService = Object.assign(
          {
            abono2019: true,
            abono2019Q: 1,
            fecha2019Q: currentDate.format(DATE_TIME_FORMAT),
            abono2020: true,
            abono2020Q: 1,
            fecha2020Q: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha2019Q: currentDate,
            fecha2020Q: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cuota', () => {
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
