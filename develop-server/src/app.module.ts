import { Module } from '@nestjs/common';
import { SetupModule } from './setup/setup.module';
import { LoggerModule } from './logger/logger.module';
import { BlogModule } from './blog/blog.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [SetupModule, LoggerModule, BlogModule, NotificationModule],
})
export class AppModule {}
