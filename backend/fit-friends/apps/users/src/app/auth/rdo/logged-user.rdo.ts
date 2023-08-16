import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id)
  @ApiProperty({
    description: 'The uniq user ID',
    example: '0667dea8-fbb7-41d0-8ff3-5b44539dbfad'
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    example: 'Fox'
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user2.png'
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'User gender',
    example: 'Мужской'
  })
  public gender: string;

  @Expose()
  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1982-02-20'
  })
  public dateBirth: string;

  @Expose()
  @ApiProperty({
    description: 'User role',
    example: 'sportsman'
  })
  public role: string;

  @Expose()
  @ApiProperty({
    description: 'Description of user',
    example: "Test description for user"
  })
  public description: number;

  @Expose()
  @ApiProperty({
    description: 'User location',
    example: 'Петроградская'
  })
  public location: string;

  @Expose()
  @ApiProperty({
    description: 'User background image',
    example: 'flowers.png'
  })
  public backgroundImage: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@user.local'
  })
  @Expose()
  public accessToken: string;
}
