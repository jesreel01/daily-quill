import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [databaseConfig],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development','production','test').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required()
      }),
      validationOptions: { allowUnknown: true, abortEarly: false }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
