import { Moment } from 'moment';
import { IAsociado } from 'app/shared/model/asociado.model';

export interface IPago2 {
  id?: number;
  cantidad2?: number;
  fecha2?: Moment;
  asociado?: IAsociado;
}

export class Pago2 implements IPago2 {
  constructor(public id?: number, public cantidad2?: number, public fecha2?: Moment, public asociado?: IAsociado) {}
}
