import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteUserModel, SiteUserSchema } from './site-user.model';
import { SiteUserRepository } from './site-user.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: SiteUserModel.name, schema: SiteUserSchema}
  ])],
  providers: [SiteUserRepository],
  exports: [SiteUserRepository]
})
export class SiteUserModule {
}
