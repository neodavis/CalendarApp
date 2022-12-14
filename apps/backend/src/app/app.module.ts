import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserController } from './user/user.controller';
import { AbsenceController } from './absence/absence.controller';
import { UserEntity } from './user/user.entity';
import { AbsenceEntity } from './absence/absence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceService } from './absence/absence.service';
import config from '../../ormconfig';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([AbsenceEntity, UserEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AbsenceController, UserController],
  providers: [AbsenceService, UserService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
