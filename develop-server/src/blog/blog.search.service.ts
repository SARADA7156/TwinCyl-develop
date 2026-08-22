import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument, BlogStatus } from "./schema/blog.schema";
import { PaginatedBlogs } from "./blog.service";

@Injectable()
export class BlogSearchService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>
    ) {}

    async findMany(status?: BlogStatus, page: number = 1, limit: number = 20): Promise<PaginatedBlogs> {
        const { data, total } = await this.findBlogs(status, page, limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    private async findBlogs(status?: BlogStatus, page: number = 1, limit: number = 20): Promise<{ data: Blog[], total: number }> {
        // 取得開始位置の計算
        const skip = (page - 1) * limit;
        const filter = status ? { status } : {};

        const [data, total] = await Promise.all([
            this.blogModel
                .find(filter, { __v: 0, _id: 0, mainText: 0 })
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.blogModel.countDocuments({ status }), // 条件に一致する全件数
        ]);

        return { data, total };
    }

    public async findOne(uuid: string): Promise<Blog> {
        const blog = await this.blogModel.findOne({ uuid }, { __v: 0, _id: 0 });

        if (!blog) {
            throw new NotFoundException({ status: 404, message: "指定された記事が見つかりません。" });
        }

        return blog;
    }
}