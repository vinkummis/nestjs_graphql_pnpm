import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'local' }),
    ConfigModule,
    JwtModule.register({
      secret: 'your-secret-key', // replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  exports: [],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
