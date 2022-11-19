import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundById } from 'src/exception-filters/not-found-by-id.filter';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * return all found posts
   * @returns { Post[] }
   */
  public async getAllPost(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    if (posts.length) {
      return posts;
    }
    throw new NotFoundException('Post have not yet been created');
  }

  /**
   * searching for post by the passed id
   * If it doesn't find it, it throws an error
   * @param id { number } id to search by
   * @returns { Post }
   */
  public async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    throw new NotFoundById('post', id);
  }

  /**
   * takes the DTO and creates a new post based on it
   * does not return errors, because posts can be
   * created with the same name
   * @param dto { CreatePostDto } data transfer object
   * @returns { Post }
   */
  public async createPost(dto: CreatePostDto): Promise<Post> {
    return this.postRepository.save(dto);
  }

  /**
   * searches the post by id and replaces
   * the old data with the passed data
   * @param id { number } id to search by
   * @param dto { UpdatePostDto } data transfer object
   * @returns { Post }
   */
  public async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, dto);
    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    throw new NotFoundById('post', id);
  }
}
