import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [
    MongoModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      envFilePath: 'src/core/.env',
      isGlobal: true,
      ignoreEnvVars: false,
    }),
  ],
  exports: [MongoModule, JwtModule, ConfigModule],
})
export class CoreModule {}
