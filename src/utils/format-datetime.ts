import { format, formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate)
  // eslint-disable-next-line
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR
  })
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate)

  return dateFnsFormatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  })
}

const rawDate = '2023-10-01T12:00:00Z'
console.log(rawDate)
console.log(formatDateTime(rawDate))
