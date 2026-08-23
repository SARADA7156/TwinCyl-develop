import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument, BlogStatus } from './schema/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDto, UpdateBlogDto } from './dto/blog.dto';
import { LoggerService } from '@/logger/logger.service';
import { NotificationService } from '@/notification/notification.service';

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
        private readonly notification: NotificationService,
        private readonly logger: LoggerService
    ) {}

    async create({ title, mainText, blogType, status, tags }: BlogDto): Promise<Blog> {
        const result =  await this.blogModel.create({
            title,
            mainText,
            blogType,
            status,
            tags,
            publishedAt: status === BlogStatus.PUBLISHED ? new Date() : undefined,
        });

        this.logger.log(`新しいブログが id: ${result._id} として保存されました。 公開状態: ${status}`);
        this.notification.send({
            level: "info",
            message: `新しいブログが id: ${result._id} として保存されました。 公開状態: ${status}`
        });

        return result;
    }

    async publish(uuid: string): Promise<void> {
        const blog = await this.blogModel.findOne({ uuid });
        if (!blog) {
            this.logger.error(`公開処理でuuid: ${uuid} を検索しましたが見つかりませんでした。`);
            throw new NotFoundException({ status: 404, message: "指定された記事が見つかりません。" });
        };

        blog.status = BlogStatus.PUBLISHED;

        if (!blog.publishedAt) {
            blog.publishedAt = new Date();
        }

        blog.save();
        this.logger.log(`uuid: ${uuid}は正常に公開されました。`);
    }

    async update({ uuid, ...datas }: UpdateBlogDto): Promise<void> {
        const result = await this.blogModel.updateOne(
            { uuid },
            { $set: datas }
        );

        if (!result.matchedCount) {
            this.logger.error(`ブログ更新処理で uuid: ${uuid} を検索しましたが見つかりませんでした。`);
            throw new NotFoundException({ status: 404, message: "指定された記事が見つかりません。" });
        }

        this.logger.log(`uuid: ${uuid} のブログが更新されました。`);
        this.notification.send({
            level: "info",
            message: `ブログが正常に更新されました。`
        });
    }
}
