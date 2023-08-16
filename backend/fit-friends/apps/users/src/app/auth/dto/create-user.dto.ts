import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length, IsISO8601 } from 'class-validator';
import { UserLocation } from '@fit-friends/shared-types';
import { AUTH_USER_DATE_BIRTH_NOT_VALID, AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';
import { Prop } from '@nestjs/mongoose';

export class CreateUserDto {

    @ApiProperty({
        description: 'User name',
        example: 'Fox',
    })
    @IsString({message: 'Name is required'})
    @Length(1, 15, {message: 'Min length is 1, max is 15'})
    public name: string;

    @ApiProperty({
        description: 'User unique address',
        example: 'user@user.ru'
    })
    @IsEmail({}, {message: AUTH_USER_EMAIL_NOT_VALID})
    public email: string;

    @ApiProperty({
        description: 'User avatar path',
        example: 'avatar.jpg'
    })
    // @IsMimeType({groups: ['image/jpg', 'image/png']})
    public avatar: string;

    @ApiProperty({
        description: 'User password',
        example: '123456'
    })
    @IsString({message: 'password is required'})
    @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
    public password: string;

    @ApiProperty({
        description: 'User birth date',
        example: '1982-02-20',
        required: false,
    })
    @IsISO8601({}, {message: AUTH_USER_DATE_BIRTH_NOT_VALID})
    public dateBirth: string;

    @Prop({
        required: false,
    })
    @IsString()
    @Length(10, 140, {message: 'Min length for description is 10, max is 140'})
    public description: string;

    @ApiProperty({
        description: 'User location',
        example: 'Петроградская',
        enum: UserLocation,
        required: true,
    })
    @IsEnum(UserLocation, {message: 'type must be from location enum'})
    public location: UserLocation;

    @ApiProperty({
        description: 'User`s background image',
        example: 'flower.png',
        required: true,
    })
    // @IsMimeType({groups: ['image/jpg', 'image/png']})
    public backgroundImage: string;
}
