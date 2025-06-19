'use client'

import clsx from 'clsx'

export function Header() {
  return (
    <h1
      className={clsx(
        'text-xl',
        'font-boldtext-blue-500',
        'hover:text-blue-50',
        'hover:bg-blue-500t',
        'ransition',
        'duration-300',
      )}
      onClick={() => alert('Clicou no h1')}
    >
      Texto do meu h1
    </h1>
  )
}
