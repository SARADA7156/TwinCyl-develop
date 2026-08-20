import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument, BlogStatus, BlogType } from './schema/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { LoggerService } from '@/logger/logger.service';

export interface PaginatedBlogs {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        private readonly logger: LoggerService
    ) {}

    async create({ title, mainText, blogType, status, tags }: CreateBlogDto): Promise<Blog> {
        const result =  await this.blogModel.create({
            title,
            mainText,
            blogType,
            status,
            tags,
            publishedAt: status === BlogStatus.PUBLISHED ? new Date() : undefined,
        });

        return result;
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
