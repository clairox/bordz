import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { config } from 'dotenv'
import schema from '@/schema'

config({ path: '.env.local' })

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
})

export const db = drizzle(pool, { schema })
