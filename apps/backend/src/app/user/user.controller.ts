import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from './user.dto';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('user/register')
    public async createUser(@Body() user: UserDto): Promise<{ token: string; }> {
        return this.userService.create(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('user/login')
    public async userLogin(@Body() user: UserDto): Promise<{ token: string; }> {
        return this.userService.login(user);
    }
}