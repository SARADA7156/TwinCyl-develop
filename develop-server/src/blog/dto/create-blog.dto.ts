import { IsArray, IsEnum, IsString } from "class-validator";
import { BlogStatus, BlogType } from "../schema/blog.schema";

export class CreateBlogDto {
    @IsString()
    title!: string;

    @IsString()
    mainText!: string;

    @IsEnum(BlogType)
    blogType!: BlogType;

    @IsEnum(BlogStatus)
    status!: BlogStatus

    @IsArray()
    tags!: string[];
}
