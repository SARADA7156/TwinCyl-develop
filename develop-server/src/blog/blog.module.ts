import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { LoggerModule } from '../logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blog.schema';
import { BlogSearchService } from './blog.search.service';
import { NotificationModule } from '@/notification/notification.module';

@Module({
  imports: [LoggerModule, MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]), NotificationModule],
  controllers: [BlogController],
  providers: [BlogService, BlogSearchService],
})
export class BlogModule {}
