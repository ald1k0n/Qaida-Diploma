import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from 'src/mongo/mongo.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongoModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      envFilePath: 'src/core/.env',
      ignoreEnvVars: false,
    }),
    AdminModule,
  ],
  exports: [MongoModule, JwtModule, ConfigModule],
})
export class CoreModule {}
