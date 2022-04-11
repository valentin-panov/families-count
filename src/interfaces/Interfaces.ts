export interface Status {
  status: 'idle' | 'pending' | 'success' | 'error'
  error: string
}

export interface InSearchId extends Status {
  token: string
}

export interface InSegment {
  // Код города (iata)
  origin: string
  // Код города (iata)
  destination: string
  // Дата и время вылета туда
  date: string
  // Массив кодов (iata) городов с пересадками
  stops: string[]
  // Общее время перелёта в минутах
  duration: number
}

export interface InTicket {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: InSegment[]
}

export interface InTickets extends Status {
  tickets: InTicket[]
}

export interface InFilter {
  s0: boolean
  s1: boolean
  s2: boolean
  s3: boolean
}

export type InSort = 'price' | 'time' | 'optimal'

export interface InFilters {
  filter: InFilter
  sort: InSort
  limit: number
}
