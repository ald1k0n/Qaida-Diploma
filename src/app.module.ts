import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { WebsocketModule } from './websocket/websocket.module';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [AuthModule, CoreModule, UserModule, WebsocketModule, SchemaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
