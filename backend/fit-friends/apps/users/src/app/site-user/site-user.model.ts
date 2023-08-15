import { Document } from 'mongoose';
import { User, UserRole, UserGender, UserLocation } from '@fit-friends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class SiteUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
    default: UserGender.NotImportant,
  })
  public gender: UserGender;

  @Prop()
  public dateBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Sportsman,
  })
  public role: UserRole;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
    default: UserLocation.Petrogradskaya,
  })
  public location: UserLocation;

  @Prop({
    required: true,
  })
  public backgroundImage: string;

  @Prop()
  public createDate: Date;
}

export const SiteUserSchema = SchemaFactory.createForClass(SiteUserModel);
