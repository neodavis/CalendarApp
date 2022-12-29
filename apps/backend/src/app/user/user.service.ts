import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async createUser(username: string, password: string): Promise<UserEntity> {
        try {
            return await this.userRepository.save({
                username: username,
                password: await bcrypt.hash(password, 7),
            });
        } catch {
            throw new HttpException("Користувач із таким ім'ям вже існує", HttpStatus.BAD_REQUEST)
        }
        
    }
    async userLogin(username: string, password: string): Promise<{ token: string | null }> {
        const user = await this.userRepository.findOne({where: { username: username }})
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new HttpException("Недійсний логін або пароль", HttpStatus.UNAUTHORIZED)
        }

        const token = this.jwtService.sign({ userId: user.userId })

        return {
            token: token
        };
    }

    async userAuth(token: string): Promise<UserEntity | null> {
        try {
            const data = this.jwtService.verify(token)
            const user = await this.userRepository.findOne({ where: { userId: data.userId } })

            if (!user) {
                throw new HttpException("Помилка при пошуку користувача", HttpStatus.BAD_REQUEST)
            }

            return user;
        } catch {
            throw new HttpException("Недійсний токен авторизації", HttpStatus.UNAUTHORIZED)
        }


    }
}