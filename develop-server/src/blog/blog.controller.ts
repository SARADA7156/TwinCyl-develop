import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BlogService, PaginatedBlogs } from './blog.service';
import { GetBlogsDto } from './dto/get-blogs.dto';
import { Blog } from './schema/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogSearchService } from './blog.search.service';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly searchService: BlogSearchService
    ) {}

    @Get()
    async getBlogs(@Query() query: GetBlogsDto): Promise<PaginatedBlogs> {
        const { status, page, limit } = query;

        return await this.searchService.findMany(status, page, limit);
    }

    @Post("create")
    async createBlog(@Body() dto: CreateBlogDto): Promise<Blog> {
        return await this.blogService.create(dto);
    }
}
