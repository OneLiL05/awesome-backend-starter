import 'dotenv/config.js'
import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().min(1000),
	POSTGRES_HOST: z.string(),
	POSTGRES_DB: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_PORT: z.coerce.number().default(5432),
	COOKIE_SECRET: z.string(),
	REDIS_HOST: z.string(),
	REDIS_USER: z.string(),
	REDIS_PASSWORD: z.string(),
	REDIS_PORT: z.coerce.number().default(6379),
})

const env = envSchema.parse(process.env)

export { env }
