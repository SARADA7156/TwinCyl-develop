import mongoose from "mongoose";
import { logger } from "../logger/logger";

declare global {
    var mongoConnection: MongoConnection | undefined;
}

class MongoConnection {
    private connectionPromise: Promise<typeof mongoose> | null = null;
    private readonly url: string;

    private constructor() {
        const url = process.env.MONGODB_URI;

        if (!url) {
            throw new Error("MONGODB_URI が設定されていません。");
        }

        this.url = url;
    }

    public static getInstance(): MongoConnection {
        if (!global.mongoConnection) {
            global.mongoConnection = new MongoConnection();
        }

        return global.mongoConnection;
    }

    public async connect(): Promise<void> {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        if (this.connectionPromise) {
            await this.connectionPromise;
            return;
        }

        try {
            this.connectionPromise = mongoose.connect(this.url)
            await this.connectionPromise;

            logger.info("✅ MongoDBに正常に接続しました。");
        } catch (err) {
            this.connectionPromise = null;

            const errorDetail =
                err instanceof Error
                    ? err.message
                    : String(err);
            logger.error(`❌ MongoDBへの接続に失敗しました 詳細: ${errorDetail}`);
            throw err;
        }
    }
}

export async function connectMongoDB(): Promise<void> {
    await MongoConnection
        .getInstance()
        .connect();
}