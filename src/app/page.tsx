import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { PostsList } from '@/components/PostsList'
import { SpinLoader } from '@/components/SpinLoader'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { PostHeading } from '@/components/PostHeading'

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link className='w-full h-full overflow-hidden rounded-xl' href='#'>
          <Image
            className='w-full h-full object-cover object-center group-hover:scale-105 transition'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='Title of the image'
            priority
          />
        </Link>
        <div className='flex flex-col gap-4 sm:justify-center'>
          <time className='text-slate-600 text-sm/tight' dateTime='2025-06-23'>
            23/06/2025 - 12:00
          </time>
          <PostHeading as='h1' url='#'>
            Lorem ipsum dolor sit ame
          </PostHeading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ad fugit illo voluptatibus magnam velit quae
            consequuntur corrupti omnis, esse porro rerum nulla quidem deserunt, aspernatur repudiandae quibusdam
            aperiam natus.
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer>
        <p className='text-6xl font-bold text-center py-8'>Aqui é o FOOTER</p>
      </footer>
    </Container>
  )
}
