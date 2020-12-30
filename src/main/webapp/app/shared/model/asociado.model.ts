import { IPago1 } from 'app/shared/model/pago-1.model';
import { IPago2 } from 'app/shared/model/pago-2.model';
import { ICuota } from 'app/shared/model/cuota.model';

export interface IAsociado {
  id?: number;
  nombre?: string;
  apellidos?: string;
  email?: string;
  acciones?: boolean;
  bonos?: boolean;
  pago1s?: IPago1[];
  pago2s?: IPago2[];
  cuotas?: ICuota[];
}

export class Asociado implements IAsociado {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidos?: string,
    public email?: string,
    public acciones?: boolean,
    public bonos?: boolean,
    public pago1s?: IPago1[],
    public pago2s?: IPago2[],
    public cuotas?: ICuota[]
  ) {
    this.acciones = this.acciones || false;
    this.bonos = this.bonos || false;
  }
}
