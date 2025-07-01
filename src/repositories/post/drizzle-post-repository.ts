import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import { drizzeDb } from '@/db/drizzle'

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzeDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.published),
      where: (posts, { eq }) => eq(posts.published, true),
    })

    return posts
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzeDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug))
    })

    if (!post) throw new Error('Post não encontrado para o slug informado')


    return post
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzeDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    })

    return posts
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzeDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id)
    })

    if (!post) throw new Error('Post não encontrado para o id informado')

    return post
  }

}

// (async () => {
//   const repo = new DrizzlePostRepository()
//   const posts = await repo.findAllPublic()

//   posts.forEach(post => console.log(post.slug, post.published))
// })()
