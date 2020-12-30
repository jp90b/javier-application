import { Moment } from 'moment';
import { IAsociado } from 'app/shared/model/asociado.model';

export interface IPago1 {
  id?: number;
  cantidad1?: number;
  fecha1?: Moment;
  asociado?: IAsociado;
}

export class Pago1 implements IPago1 {
  constructor(public id?: number, public cantidad1?: number, public fecha1?: Moment, public asociado?: IAsociado) {}
}
