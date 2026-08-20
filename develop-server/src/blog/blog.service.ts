import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument, BlogStatus } from './schema/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export interface PaginatedBlogs {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findPublished(page: number = 1, limit: number = 20): Promise<PaginatedBlogs> {
    // 取得開始位置の計算
    const skip = (page - 1) * limit;

    // 公開済みの記事のみ取得
    const filter = { status: BlogStatus.PUBLISHED };

    const [data, total] = await Promise.all([
      this.blogModel
        .find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.blogModel.countDocuments(filter), // 条件に一致する全件数
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async publish(uuid: string): Promise<Blog> {
    const blog = await this.blogModel.findOne({ uuid });
    if (!blog) throw new NotFoundException({ status: 404, message: "指定された記事が見つかりません。" });

    blog.status = BlogStatus.PUBLISHED;

    if (!blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    return blog.save();
  }
}
