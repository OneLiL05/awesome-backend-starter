import type { Config, DbConfig, RedisConfig } from '@/core/types/index.js'
import { env } from '@/env.js'

const getDbConfig = (): DbConfig => ({
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	host: env.POSTGRES_HOST,
	port: env.POSTGRES_PORT,
	database: env.POSTGRES_DB,
})

const getRedisConfig = (): RedisConfig => ({
	host: env.REDIS_HOST,
	user: env.REDIS_USER,
	password: env.REDIS_PASSWORD,
	port: env.REDIS_PORT,
})

const getConfig = (): Config => ({
	db: getDbConfig(),
	redis: getRedisConfig(),
})

export { getConfig }
