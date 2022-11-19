import { Post } from '../../post.entity';

export class MockProductRepository {
  public find(): Post[] {
    return [new Post()];
  }

  public findOne(): Post {
    return new Post();
  }

  public save(): Post {
    return new Post();
  }

  public update(): Post {
    return new Post();
  }
}
