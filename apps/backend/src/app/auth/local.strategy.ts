import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super();
    }

    public async validate(username: string, password: string): Promise<UserEntity> {
        const user = await this.userService.validate(username, password);
        if (!user) {
            throw new NotFoundException("Неправильний логін або пароль");
        }
        return user;
    }
}