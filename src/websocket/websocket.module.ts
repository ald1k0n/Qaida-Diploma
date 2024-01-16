import { Module } from '@nestjs/common';
import { LobbyModule } from 'src/lobby/lobby.module';

@Module({
  imports: [LobbyModule],
  exports: [LobbyModule],
})
export class WebsocketModule {}
