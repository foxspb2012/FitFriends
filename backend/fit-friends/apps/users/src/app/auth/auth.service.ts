import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SiteUserRepository } from '../site-user/site-user.repository';
import { AUTH_USER_BY_ID, AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { SiteUserEntity } from '../site-user/site-user.entity';
import { User, UserGender, UserRole } from '@fit-friends/shared-types';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly siteUserRepository: SiteUserRepository,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(dto: CreateUserDto) {
        const { name, email, password, dateBirth,
            description, location, backgroundImage} = dto;
        const siteUser: User = { name, email, avatar: '', passwordHash: '', gender: UserGender.NotImportant,
            dateBirth: dayjs(dateBirth).toDate(), role: UserRole.Sportsman, description, location, backgroundImage};

        const existUser = await this.siteUserRepository
            .findByEmail(email);

        if (existUser) {
            throw new UnauthorizedException(AUTH_USER_EXISTS);
        }

        const userEntity = await new SiteUserEntity(siteUser)
            .setPassword(password)

        return this.siteUserRepository.create(userEntity);
    }

    async verifyUser(dto: LoginUserDto) {
        const {email, password} = dto;
        const existUser = await this.siteUserRepository.findByEmail(email);

        if (!existUser) {
            throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
        }

        const siteUserEntity = new SiteUserEntity(existUser);
        if (!await siteUserEntity.comparePassword(password)) {
            throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }

        return siteUserEntity.toObject();
    }

    async login(dto: User) {

        const payload = {
            sub: dto._id,
            email: dto.email,
            role: dto.role,
            name: dto.name,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getUser(id: string) {
        const user = await this.siteUserRepository.findById(id);

        if (!user) {
            throw new Error(AUTH_USER_BY_ID);
        }

        return user;
    }

    async deleteUser(id: string): Promise<void> {
        await this.siteUserRepository.destroy(id);
    }
}
