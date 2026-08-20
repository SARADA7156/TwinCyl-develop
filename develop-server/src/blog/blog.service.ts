import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument, BlogStatus, BlogType } from './schema/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';

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

  async findPublished(status: BlogStatus, page: number = 1, limit: number = 20): Promise<PaginatedBlogs> {
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

  async publish(uuid: string): Promise<Blog> {
    const blog = await this.blogModel.findOne({ uuid });
    if (!blog) throw new NotFoundException({ status: 404, message: "指定された記事が見つかりません。" });

    blog.status = BlogStatus.PUBLISHED;

    if (!blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    return blog.save();
  }

  async create({ title, mainText, blogType, status, tags }: CreateBlogDto): Promise<Blog> {
    return await this.blogModel.create({
      title,
      mainText,
      blogType,
      status,
      tags,
      publishedAt: status === BlogStatus.PUBLISHED ? new Date() : undefined,
    });
  }
}
