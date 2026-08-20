import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './validate-conf';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${process.env.NODE_ENV}` || "development"],
            validationSchema: validationSchema,

            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            }
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>("MONGODB_URL"),
            })
        }),
    ],
})
export class SetupModule {}
