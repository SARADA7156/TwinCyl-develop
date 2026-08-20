import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetupModule } from './setup/setup.module';
import { LoggerModule } from './logger/logger.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [SetupModule, LoggerModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
