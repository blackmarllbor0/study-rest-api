import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../post.entity';
import { PostService } from '../post.service';
import { MockProductRepository } from './mocks/product-repository.mock';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: MockProductRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPost', () => {
    let res: Post[];
    beforeEach(() => {
      res = [new Post()];
    });
    it('should be return all posts', async () => {
      const fun = await service.getAllPost();
      expect(fun).toEqual(res);
    });
  });

  describe('getPostById', () => {
    let res: Post;
    let id: number;
    beforeEach(() => {
      res = new Post();
      id = 1;
    });
    it('should be return post', async () => {
      const fun = await service.getPostById(id);
      expect(fun).toEqual(res);
    });
  });

  describe('createPost', () => {
    let res: Post;
    let dto: CreatePostDto;
    beforeEach(() => {
      res = new Post();
      dto = { name: 'name', description: 'description' };
    });
    it('should be return created post', async () => {
      const fun = await service.createPost(dto);
      expect(fun).toEqual(res);
    });
  });

  describe('updatePost', () => {
    let res: Post;
    let id: number;
    let dto: UpdatePostDto;
    beforeEach(() => {
      res = new Post();
      id = 1;
      dto = { name: 'name', description: 'description' };
    });
    it('should be return update post', async () => {
      const fun = await service.updatePost(id, dto);
      expect(fun).toEqual(res);
    });
  });
});
