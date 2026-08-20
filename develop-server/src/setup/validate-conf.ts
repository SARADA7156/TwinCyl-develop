import Joi, { ObjectSchema } from "joi";

export const validationSchema: ObjectSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
    // NestJSの環境変数スキーマ定義
    PORT: Joi.number().default(8080),

    // Mongoose環境変数のスキーマ定義
    MONGO_INITDB_DATABASE: Joi.string().required(),
    MONGO_APP_USER: Joi.string().required(),
    MONGO_APP_PASSWORD: Joi.string().required(),
    MONGODB_URL: Joi.string().uri().required(),
})