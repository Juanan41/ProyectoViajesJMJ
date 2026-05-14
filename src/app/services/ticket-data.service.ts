import { Injectable } from '@angular/core';
import { ReservaResponse } from './reserva.service';

export interface TicketData {
  codigoTicket: string;
  identificadorTransporte: string;
  tipoTransporte: string;
  nombreTransporte: string;
  hora: string;
  puerta: string;
  asiento: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketDataService {
  getTicketData(reserva: ReservaResponse | null | undefined): TicketData {
    const id = reserva?.id ?? 0;
    const tipo = this.normalizeTransportType(reserva?.transporteTipo);

    return {
      codigoTicket: `TKM-${String(id).padStart(8, '0')}`,
      identificadorTransporte: this.getTransportIdentifier(id, tipo),
      tipoTransporte: this.getTransportLabel(tipo),
      nombreTransporte: reserva?.transporteNombre || this.getDefaultTransportName(tipo),
      hora: reserva?.transporteHora || this.generateHour(id),
      puerta: reserva?.transportePuerta || this.generateGate(id, tipo),
      asiento: reserva?.transporteAsiento || this.generateSeat(id),
    };
  }

  private normalizeTransportType(type: string | undefined | null): 'AVION' | 'TREN' | 'BARCO' {
    const normalized = (type || '').toUpperCase();

    if (normalized.includes('TREN')) return 'TREN';
    if (normalized.includes('BARCO')) return 'BARCO';

    return 'AVION';
  }

  private getTransportLabel(type: 'AVION' | 'TREN' | 'BARCO'): string {
    if (type === 'TREN') return 'Tren';
    if (type === 'BARCO') return 'Barco';
    return 'Vuelo';
  }

  private getDefaultTransportName(type: 'AVION' | 'TREN' | 'BARCO'): string {
    if (type === 'TREN') return 'JMJ Rail';
    if (type === 'BARCO') return 'JMJ Cruises';
    return 'JMJ Airlines';
  }

  private getTransportIdentifier(id: number, type: 'AVION' | 'TREN' | 'BARCO'): string {
    const paddedId = String(id).padStart(5, '0');

    if (type === 'TREN') return `JMJ-TRN-${paddedId}`;
    if (type === 'BARCO') return `JMJ-SHP-${paddedId}`;

    return `JMJ-AIR-${paddedId}`;
  }

  private generateHour(id: number): string {
    const hours = ['08:30', '10:15', '12:00', '14:45', '18:20', '21:10'];
    return hours[id % hours.length];
  }

  private generateGate(id: number, type: 'AVION' | 'TREN' | 'BARCO'): string {
    const number = (id % 18) + 1;

    if (type === 'TREN') return `Vía ${number}`;
    if (type === 'BARCO') return `Muelle ${number}`;

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return `${letters[id % letters.length]}${number}`;
  }

  private generateSeat(id: number): string {
    const rows = (id % 28) + 1;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return `${rows}${letters[id % letters.length]}`;
  }
}
