import { UserRole } from '@fit-friends/shared-types';
import { UserGenderEnum } from './user-gender.enum';
import { UserLocationEnum } from './user-location.enum';
export interface User {
  _id: string,
  name: string;
  email: string;
  avatar: string,
  passwordHash: string;
  gender: UserGenderEnum;
  dateBirth: Date;
  role: UserRole;
  description: string;
  location: UserLocationEnum;
  backgroundImage: string;
  createDate?: Date;
}
