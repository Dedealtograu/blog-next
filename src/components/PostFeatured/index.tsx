import { PostCoverImage } from '../PostCoverImage'
import { PostSummary } from '../PostSummary'
import { findAllPublicPostsCached } from '@/lib/post/queries'

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached()
  const [firstPost] = posts
  const postLink = `/post/${firstPost.slug}`
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: firstPost.coverImageUrl,
          alt: firstPost.title,
          priority: true,
        }}
      />
      <PostSummary
        postLink={postLink}
        postHeading='h1'
        createdAt={firstPost.createdAt}
        title={firstPost.title}
        excerpt={firstPost.excerpt}
      />
    </section>
  )
}
