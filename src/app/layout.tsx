import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The blog - Este é um blog criado com Next.js',
  description: 'Este é um blog criado com Next.js, TypeScript e Tailwind CSS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body>{children}</body>
    </html>
  )
}
