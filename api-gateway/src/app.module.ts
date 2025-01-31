import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { ApplicationModule } from './modules/application/application.module';
import { JwtAuthGuard } from './modules/auth/infrastrucutre/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApplicationModule,
    AdvertisementModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
