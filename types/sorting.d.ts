import { SQL } from 'drizzle-orm'

type SortOptions = Record<SortKey, SQL>
type SortKey =
    | 'date-desc'
    | 'date-asc'
    | 'price-asc'
    | 'price-desc'
    | 'alpha-asc'
    | 'alpha-desc'
