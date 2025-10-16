import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PaginatedList } from '../models/paginated-page.model';
import { IBPost } from './posts.model';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Создать пост' })
  @ApiResponse({ status: 200, type: Post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }

  @ApiOperation({ summary: 'Получить посты' })
  @ApiResponse({ status: 200, type: [Post] })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<PaginatedList<IBPost>> {
    const iPage = page ? parseInt(page, 10) : 1;
    const iPageSize = pageSize ? parseInt(pageSize, 10) : 10;
    return this.postService.getAllPosts(iPage, iPageSize);
  }
}
