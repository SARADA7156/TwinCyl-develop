import { IsEnum, IsInt, IsOptional } from "class-validator";
import { BlogStatus } from "../schema/blog.schema";
import { Type } from "class-transformer";

export class GetBlogsDto {
    @IsOptional()
    @IsEnum(BlogStatus)
    status?: BlogStatus;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number = 20;

}