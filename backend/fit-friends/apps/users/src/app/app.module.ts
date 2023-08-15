import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SiteUserModule } from './site-user/site-user.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtConfig } from '../config/jwt.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: ENV_FILE_PATH,
            load: [databaseConfig, jwtConfig],
            validate: validateEnvironments,
        }),
        MongooseModule.forRootAsync(getMongoDbConfig()),
        SiteUserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
