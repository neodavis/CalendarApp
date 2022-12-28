import { User } from './../../../../../libs/interfaces/src/lib/user';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private JwtService: JwtService,
    ) {}

    public async userLogin(user: UserDto): Promise<{ token: string }> {
        const target: UserEntity | null = await this.userRepository.findOneBy(
            { username: user.username }
        )

        if (target && target.password == user.password) {
            const token = await this.JwtService.sign({ username: user.username })
            target.token = token
            await this.userRepository.save(target)
            return {
                token: token
            };
        }
        
        throw new HttpException("Неправильні дані. Виправте дані та спробуйте ще раз.", 401)
    }

    public async userAuth(token: string): Promise<{ user_id: number, username: string } | null> {
        const target: UserEntity | null = await this.userRepository.findOne( 
            { where: { token: String(token) } } 
        )
        
        try {
            if (target && await this.JwtService.verify(token)) {
                return {
                    user_id: target.user_id,
                    username: target.username 
                }
            }
        } catch {
            throw new HttpException("Час сеансу вичерпаний.", 401)
        }

        return null;
    }

    public async userRegister(user: User): Promise<UserEntity> {
        try {
            return await this.userRepository.save({
                user_id: user.user_id,
                username: user.username,
                password: user.password,
            })
        } catch {
            throw new HttpException("Користувач з таким ім'ям вже існує", 401)
        }
    }
}