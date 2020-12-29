import { Moment } from 'moment';
import { IAsociado } from 'app/shared/model/asociado.model';

export interface ICuota {
  id?: number;
  abono2019?: boolean;
  abono2019Q?: number;
  fecha2019Q?: Moment;
  abono2020?: boolean;
  abono2020Q?: number;
  fecha2020Q?: Moment;
  asociado?: IAsociado;
}

export class Cuota implements ICuota {
  constructor(
    public id?: number,
    public abono2019?: boolean,
    public abono2019Q?: number,
    public fecha2019Q?: Moment,
    public abono2020?: boolean,
    public abono2020Q?: number,
    public fecha2020Q?: Moment,
    public asociado?: IAsociado
  ) {
    this.abono2019 = this.abono2019 || false;
    this.abono2020 = this.abono2020 || false;
  }
}
