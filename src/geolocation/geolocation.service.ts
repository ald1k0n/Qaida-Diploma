import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IGeoLocation } from './types';

@Injectable()
export class GeolocationService {
  private connectedClients: Set<string> = new Set();
  private clientLocations: Map<string, IGeoLocation> = new Map();

  private logger = new Logger();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.logger.log('Client Connected', clientId);
    this.connectedClients.add(clientId);

    console.log(this.connectedClients);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
      this.clientLocations.delete(clientId);
      this.logger.log('disconnected client', clientId);

      console.log({
        connectedClients: this.connectedClients,
        locations: this.clientLocations,
      });
    });
  }

  handleGeolocation(clientId: string, location: IGeoLocation) {
    this.clientLocations.set(clientId, location);
    console.log(this.clientLocations);
  }
}
