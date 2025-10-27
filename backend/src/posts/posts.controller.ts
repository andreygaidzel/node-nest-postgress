import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PaginatedList } from '../models/paginated-page.model';
import { IBPost } from './posts.model';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: Post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }

  @ApiOperation({ summary: 'Обновить пост' })
  @ApiResponse({ status: 200, type: Post })
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.postService.updatePost(+id, dto, image);
  }

  @ApiOperation({ summary: 'Get posts' })
  @ApiResponse({ status: 200, type: [Post] })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('sort') sort: string,
    @Query('filter') filter: string,
  ): Promise<PaginatedList<IBPost>> {
    const iPage = page ? parseInt(page, 10) : 1;
    const iPageSize = pageSize ? parseInt(pageSize, 10) : 10;
    return this.postService.getAllPosts(iPage, iPageSize, sort, filter);
  }

  @ApiOperation({ summary: 'Remove post by ID' })
  @ApiResponse({ status: 200, description: 'Post was removed' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the Post' })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    return this.postService.deletePost(postId);
  }
}
