import { UserEntity } from './user.entity';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('user/register')
    async createUser(@Body() body: UserDto): Promise<UserEntity> {
        return this.userService.createUser(body.username, body.password)
    }

    @Post('user/login')
    async userLogin(@Body() body: UserDto): Promise<{ token: string | null }> {
        const token = await this.userService.userLogin(body.username, body.password)
        return token;
    }

    @Get('user/auth/:token')
    async userAuth(@Param('token') token: string): Promise<UserEntity | null> {
        return this.userService.userAuth(token)
    }
}