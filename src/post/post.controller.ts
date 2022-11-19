import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post as PostRequest,
  Put,
} from '@nestjs/common';
import { FindOneParamById } from '../utils/find-one-param';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  public async getAllPost(): Promise<Post[]> {
    return await this.postService.getAllPost();
  }

  @HttpCode(HttpStatus.OK)
  @Get('getById/:id')
  public async getPostById(@Param() { id }: FindOneParamById): Promise<Post> {
    return await this.postService.getPostById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @PostRequest('create')
  public async createPost(@Body() dto: CreatePostDto): Promise<Post> {
    return await this.postService.createPost(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put('updateById/:id')
  public async updatePost(
    @Param() { id }: FindOneParamById,
    @Body() dto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.updatePost(id, dto);
  }
}
