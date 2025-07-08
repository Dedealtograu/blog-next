import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import { drizzeDb } from '@/db/drizzle'
import { logColor } from '@/utils/log-color'
import { asyncDelay } from '@/utils/async-delay'
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants'
import { postsTable } from '@/db/drizzle/schemas'
import { eq } from 'drizzle-orm'

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true)
    logColor('findAllPublic', Date.now())

    const posts = await drizzeDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.published),
      where: (posts, { eq }) => eq(posts.published, true),
    })

    return posts
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true)
    logColor('findBySlugPublic', Date.now())

    const post = await drizzeDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug))
    })

    if (!post) throw new Error('Post não encontrado para o slug informado')


    return post
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true)
    logColor('findAll', Date.now())

    const posts = await drizzeDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    })

    return posts
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true)
    logColor('findById', Date.now())

    const post = await drizzeDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id)
    })

    if (!post) throw new Error('Post não encontrado para o id informado')

    return post
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzeDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    })

    if (!post) {
      throw new Error('Post não existe')
    }

    await drizzeDb.delete(postsTable).where(eq(postsTable.id, id))

    return post
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository()
//   const posts = await repo.findAllPublic()

//   posts.forEach(post => console.log(post.slug, post.published))
// })()
