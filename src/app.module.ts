import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { WebsocketModule } from './websocket/websocket.module';
import { SchemaModule } from './schema/schema.module';
import { ConfigModule } from '@nestjs/config';
import { LobbyModule } from './lobby/lobby.module';
import { PlaceModule } from './place/place.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    UserModule,
    LobbyModule,
    WebsocketModule,
    SchemaModule,
    ConfigModule.forRoot({
      envFilePath: 'src/core/.env',
      ignoreEnvVars: false,
    }),
    PlaceModule,
    MongooseModule.forRoot(process.env?.DATABASE_URL)
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
