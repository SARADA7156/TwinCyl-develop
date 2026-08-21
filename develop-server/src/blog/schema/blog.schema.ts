import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type BlogDocument = HydratedDocument<Blog>;

export enum BlogType {
    BLOG = "blog",
    TECHNICAL = "technical"
}

export enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}

@Schema({ timestamps: true })
export class Blog {
    @Prop({ default: () => uuidv4(), unique: true, index: true })
    uuid!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    mainText!: string;

    @Prop({ type: String, enum: BlogType, default: BlogType.BLOG })
    blogType!: BlogType;

    @Prop({ type: String, enum: BlogStatus, default: BlogStatus.DRAFT, index: true })
    status!: BlogStatus;

    @Prop([String])
    tags!: string[];

    @Prop()
    publishedAt?: Date;

    createdAt!: Date;
    updatedAt!: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);