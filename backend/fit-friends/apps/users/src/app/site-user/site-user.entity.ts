import { User, UserRole, UserGender, UserLocation } from '@fit-friends/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './site-user.constant';

export class SiteUserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public gender: UserGender;
  public dateBirth: Date;
  public role: UserRole;
  public description: string;
  public location: UserLocation;
  public backgroundImage: string;
  public createDate?: Date;

  constructor(siteUser: User) {
    this.fillEntity(siteUser);
  }

  public async setPassword(password: string): Promise<SiteUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(siteUser: User) {
    this._id = siteUser._id;
    this.name = siteUser.name;
    this.email = siteUser.email;
    this.avatar= siteUser.avatar
    this.passwordHash = siteUser.passwordHash;
    this.gender = siteUser.gender;
    this.dateBirth = siteUser.dateBirth;
    this.role = siteUser.role;
    this.description = siteUser.description;
    this.location = siteUser.location;
    this.backgroundImage = siteUser.backgroundImage;
    this.createDate = new Date();
  }
}
