import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { IBPost } from './posts.model';
import { FilesService } from '../files/files.service';
import { PaginatedList } from '../models/paginated-page.model';
import { Op } from 'sequelize';

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
    sort: string,
    filter: string,
  ): Promise<PaginatedList<IBPost>> {
    console.log(111111, page, pageSize, sort, filter);
    const offset = (page - 1) * pageSize;

    let order: [string, 'ASC' | 'DESC'][] = [['createdAt', 'DESC']];
    if (sort) {
      const [field, direction] = sort.split('.');
      order = [[field, direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']];
    }

    const where: any = {};
    if (filter) {
      const filterPairs = filter.split(';');
      for (const pair of filterPairs) {
        const [key, value] = pair.split('=');
        if (key && value) {
          where[key.trim()] = { [Op.iLike]: `%${value.trim()}%` };
        }
      }
    }

    const { rows: posts, count: totalItems } =
      await this.postRepository.findAndCountAll({
        where,
        order,
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
