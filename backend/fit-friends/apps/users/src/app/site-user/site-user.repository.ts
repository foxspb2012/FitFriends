import { CRUDRepository } from '@fit-friends/core';
import { SiteUserEntity } from './site-user.entity';
import { User } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { SiteUserModel } from './site-user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SiteUserRepository implements CRUDRepository<SiteUserEntity, string, User> {
  constructor(
    @InjectModel(SiteUserModel.name) private readonly siteUserModel: Model<SiteUserModel>) {
  }

  public async create(item: SiteUserEntity): Promise<User> {
    const newSiteUser = new this.siteUserModel(item);
    return newSiteUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    return this.siteUserModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.siteUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: SiteUserEntity): Promise<User> {
    return this.siteUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.siteUserModel
      .deleteOne({_id: id});
  }
}
