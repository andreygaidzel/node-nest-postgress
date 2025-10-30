import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
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

  async create(dto: CreatePostDto, image: File) {
    const fileName = await this.fileService.createFile(image);
    return await this.postRepository.create({ ...dto, image: fileName });
  }

  async updatePost(
    id: number,
    dto: UpdatePostDto,
    image?: Express.Multer.File,
  ) {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (image) {
      const fileName = await this.fileService.createFile(image);
      await post.update({ ...dto, image: fileName });
    } else {
      await post.update(dto);
    }

    return post;
  }

  async getAllPosts(
    page: number = 1,
    pageSize: number = 10,
    sort: string,
    filter: string,
  ): Promise<PaginatedList<IBPost>> {
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
          if (key.includes('*lte')) {
            const originalKey = key.replace('*lte', '');
            where[originalKey] = {
              ...where[originalKey],
              [Op.lte]: new Date(decodeURIComponent(value)),
            };
          } else if (key.includes('*gte')) {
            const originalKey = key.replace('*gte', '');
            where[originalKey] = {
              ...where[originalKey],
              [Op.gte]: new Date(decodeURIComponent(value)),
            };
          } else {
            where[key.trim()] = { [Op.iLike]: `%${value.trim()}%` };
          }
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

  async deletePost(id: number): Promise<{ message: string }> {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Post with id - ${id} not exist`);
    }

    await this.postRepository.destroy({ where: { id } });

    return { message: `Post with id: ${id} was removed` };
  }
}
