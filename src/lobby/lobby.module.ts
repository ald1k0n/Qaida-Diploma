import { Module } from '@nestjs/common';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';

@Module({
  providers: [LobbyService, LobbyGateway],
  exports: [LobbyGateway],
})
export class LobbyModule {}
