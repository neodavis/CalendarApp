import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }


    public async validate(username: string, password: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    public async create(body: UserDto): Promise<{ token: string; }> {
        try {
            const user = await this.userRepository.save({
                username: body.username,
                password: await bcrypt.hash(body.password, 7)
            });

            return {
                token: this.jwtService.sign({ userId: user.userId })
            };
        } catch {
            throw new HttpException("Користучач із таким ім'ям вже існує", 401);
        }
    }

    public async login(body: UserEntity): Promise<{ token: string; }> {
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        return {
            token: this.jwtService.sign({ userId: user?.userId })
        };
    }
}