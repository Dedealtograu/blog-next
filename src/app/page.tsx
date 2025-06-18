import clsx from "clsx";

export default function HomePage() {
  return (
    <div>
      <h1 className={clsx('text-xl', 'font-boldtext-blue-500', 'hover:text-blue-50', 'hover:bg-blue-500t', 'ransition', 'duration-300')}
        >Texto do meu h1</h1>
    </div>
  )
}
