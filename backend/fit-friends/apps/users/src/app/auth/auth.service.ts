import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SiteUserRepository } from '../site-user/site-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, AUTH_USER_BY_ID } from './auth.constant';
import { SiteUserEntity } from '../site-user/site-user.entity';
import { User } from '@fit-friends/shared-types';
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
        const {
            name, email, password, gender, dateBirth, role,
            description, location, backgroundImage
        } = dto;
        const siteUser: User = {
            name,
            email,
            avatar: '',
            passwordHash: '',
            gender,
            dateBirth: dayjs(dateBirth).toDate(),
            role,
            description,
            location,
            backgroundImage
        };

        const existUser = await this.siteUserRepository
            .findByEmail(email);

        if (existUser) {
            throw new UnauthorizedException(AUTH_USER_EXISTS);
        }

        const siteUserEntity = new SiteUserEntity(siteUser);
        if (!await siteUserEntity.comparePassword(password)) {
            throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }

        return siteUserEntity.toObject();
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
