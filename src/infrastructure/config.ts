import type { Config, DbConfig } from '@/core/types/index.js'
import { env } from '@/env.js'

const getDbConfig = (): DbConfig => ({
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	host: env.POSTGRES_HOST,
	port: env.POSTGRES_PORT,
	database: env.POSTGRES_DB,
})

const getConfig = (): Config => ({
	db: getDbConfig(),
})

export { getConfig }
