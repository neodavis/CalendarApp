import { UserService } from './../user/user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super();
    }

    public async validate(username: string, password: string): Promise<boolean> {
        const user = await this.userService.validate(username, password);
        if (!user) {
            throw new UnauthorizedException("Неправильний логін або пароль");
        }
        return true;
    }
}