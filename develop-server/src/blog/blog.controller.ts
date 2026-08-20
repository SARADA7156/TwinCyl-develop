import { Controller, Get, Query } from '@nestjs/common';
import { BlogService, PaginatedBlogs } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ): Promise<PaginatedBlogs> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 20;

    return this.blogService.findPublished(pageNumber, limitNumber);
  }
}
