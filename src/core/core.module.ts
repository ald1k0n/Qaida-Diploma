import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from 'src/mongo/mongo.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongoModule,
    JwtModule.register({
      global: true,
    }),

    AdminModule,
  ],
  exports: [MongoModule, JwtModule],
})
export class CoreModule {}
