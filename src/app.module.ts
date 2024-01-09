import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AuthModule, CoreModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
