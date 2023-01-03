import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from './user.dto';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('user/register')
    public async createUser(@Body() user: UserDto): Promise<UserEntity> {
        return this.userService.create(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('user/login')
    public async userLogin(@Request() req: { user: UserEntity; }): Promise<{ token: string; }> {
        return this.userService.login(req.user);
    }
}