import { PostCoverImage } from '../PostCoverImage'
import { PostHeading } from '../PostHeading'

export function PostFeatured() {
  const slug = 'lorem-ipsum-dolor-sit-amet'
  const postLink = `/posts/${slug}`
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: '/images/bryen_9.png',
          alt: 'Imagem de capa do post',
          priority: true,
        }}
      />
      <div className='flex flex-col gap-4 sm:justify-center'>
        <time className='text-slate-600 text-sm/tight' dateTime='2025-06-23'>
          23/06/2025 - 12:00
        </time>
        <PostHeading as='h1' url={postLink}>
          Lorem ipsum dolor sit ame
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ad fugit illo voluptatibus magnam velit quae
          consequuntur corrupti omnis, esse porro rerum nulla quidem deserunt, aspernatur repudiandae quibusdam aperiam
          natus.
        </p>
      </div>
    </section>
  )
}
