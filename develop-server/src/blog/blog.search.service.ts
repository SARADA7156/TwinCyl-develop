import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument, BlogStatus } from "./schema/blog.schema";
import { PaginatedBlogs } from "./blog.service";

@Injectable()
export class BlogSearchService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>
    ) {}

    async findMany(status: BlogStatus, page: number = 1, limit: number = 20): Promise<PaginatedBlogs> {
        const { data, total } = await this.findBlogs(status, page, limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    private async findBlogs(status: BlogStatus, page: number = 1, limit: number = 20): Promise<{ data: Blog[], total: number }> {
        // 取得開始位置の計算
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.blogModel
                .find({ status })
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.blogModel.countDocuments({ status }), // 条件に一致する全件数
        ]);

        return { data, total };
    }
}