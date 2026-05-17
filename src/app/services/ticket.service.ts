import { Injectable } from '@angular/core';
import { ReservaResponse } from './reserva.service';

export interface TicketData {
  tipoTransporte: string;
  nombreTransporte: string;
  identificadorTransporte: string;
  hora: string;
  puerta: string;
  asiento: string;
  codigoTicket: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  getTicketData(reserva: ReservaResponse | null | undefined): TicketData {
    const id = Number(reserva?.id || 0);
    const idTicket = String(id).padStart(8, '0');
    const idTransporte = String(id).padStart(5, '0');

    const rawType = (reserva?.transporteTipo || reserva?.transporteNombre || 'AVION').toUpperCase();

    const isTrain = rawType.includes('TREN');
    const isShip = rawType.includes('BARCO');

    const tipoTransporte = isTrain ? 'Tren' : isShip ? 'Barco' : 'Vuelo';
    const prefix = isTrain ? 'TRN' : isShip ? 'SEA' : 'AIR';

    const horas = ['08:30', '10:15', '12:00', '16:45', '20:30', '22:10'];
    const puertas = ['A1', 'B7', 'C3', 'D20', 'G15', 'H8'];
    const asientos = ['2A', '7C', '3C', '16B', '12F', '21D'];

    return {
      tipoTransporte,
      nombreTransporte: this.getValidValue(reserva?.transporteNombre, tipoTransporte),
      identificadorTransporte: `JMJ-${prefix}-${idTransporte}`,
      hora: this.getValidValue(reserva?.transporteHora, horas[id % horas.length]),
      puerta: this.getValidValue(reserva?.transportePuerta, puertas[id % puertas.length]),
      asiento: this.getValidValue(reserva?.transporteAsiento, asientos[id % asientos.length]),
      codigoTicket: `TKM-${idTicket}`,
    };
  }

  private getValidValue(value: string | null | undefined, fallback: string): string {
    const cleanValue = (value || '').trim();

    if (!cleanValue || cleanValue === '-') {
      return fallback;
    }

    return cleanValue;
  }
}
