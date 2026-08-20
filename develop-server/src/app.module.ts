import { Module } from '@nestjs/common';
import { SetupModule } from './setup/setup.module';
import { LoggerModule } from './logger/logger.module';
import { BlogModule } from './blog/blog.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [SetupModule, LoggerModule, BlogModule, NoticeModule],
})
export class AppModule {}
