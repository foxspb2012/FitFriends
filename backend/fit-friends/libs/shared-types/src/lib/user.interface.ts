import { UserRole } from '@fit-friends/shared-types';
import { UserGender } from './user-gender.enum';
import { UserLocation } from './user-location.enum';

export interface User {
  _id?: string,
  name: string;
  email: string;
  avatar: string,
  passwordHash: string;
  gender: UserGender;
  dateBirth: Date;
  role: UserRole;
  description: string;
  location: UserLocation;
  backgroundImage: string;
  createDate?: Date;
}
