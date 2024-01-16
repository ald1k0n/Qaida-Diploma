import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/lobby',
  cors: {
    origin: '*',
  },
})
export class LobbyGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger();

  // NOTE: Записывать пользователь в редис для того чтобы персистит им их socket id
  handleConnection(client: any) {
    const headers = client.handshake.headers;
    console.log(headers);
  }

  @SubscribeMessage('lobby-join')
  handleLobbyConnection(@ConnectedSocket() client: Socket) {
    this.logger.log('user connected', client.id);
    this.server.to(client.id).emit('lobby-connected', {
      id: client.id,
    });
  }
}
