import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { IBPost } from './posts.model';
import { FilesService } from '../files/files.service';
import { PaginatedList } from '../models/paginated-page.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(IBPost) private postRepository: typeof IBPost,
    private fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    return await this.postRepository.create({ ...dto, image: fileName });
  }

  async getAllPosts(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedList<IBPost>> {
    const offset = (page - 1) * pageSize;
    const { rows: posts, count: totalItems } =
      await this.postRepository.findAndCountAll({
        include: { all: true },
        limit: pageSize,
        offset: offset,
      });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data: posts,
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
