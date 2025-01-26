import { ConfigModule, ConfigService } from '@nestjs/config';
import { BCryptHashingService } from './infrastrucutre/services/bcrypt-hashing.service';
import { JwtTokenService } from './infrastrucutre/services/jwt-token-service';
import { AuthController } from './presentation/controllers/auth.controller';
import { HashingService } from './application/interfaces/hashing.service.interface';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastrucutre/strategies/local.strategy';
import { TokenService } from './application/interfaces/token.service.interface';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtStrategy } from './infrastrucutre/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    LoginUseCase,
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    {
      provide: HashingService,
      useClass: BCryptHashingService,
    },
  ],
})
export class AuthModule {}
