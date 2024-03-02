import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GeolocationService } from './geolocation.service';
import { IGeoLocation } from './types';

import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: true,
  namespace: 'geolocation',
})
export class GeolocationGateway {
  @WebSocketServer()
  private server: Socket;

  private logger = new Logger();

  constructor(private readonly geolocationService: GeolocationService) {}

  handleConnection(socket: Socket): void {
    this.geolocationService.handleConnection(socket);
    this.server.emit('connection', 'Клиент подключен к сокету');
  }

  @SubscribeMessage('send-location')
  handleLocation(
    @MessageBody() location: IGeoLocation,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log('client', client.id);

    this.geolocationService.handleGeolocation(client.id, location);
  }
}
