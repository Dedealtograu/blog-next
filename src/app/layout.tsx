import type { Metadata } from 'next'
import './globals.css'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: {
    default: 'The blog - Este é um blog criado com Next.js',
    template: '%s | The blog',
  },
  description: 'Este é um blog criado com Next.js, TypeScript e Tailwind CSS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />
          {children}
          <footer>
            <p className='text-6xl font-bold text-center py-8'>Aqui é o FOOTER</p>
          </footer>
        </Container>
      </body>
    </html>
  )
}
