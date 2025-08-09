interface DbConfig {
	user: string
	password: string
	host: string
	port: number
	database: string
}

interface RedisConfig {
	user: string
	host: string
	port: number
	password: string
}

interface Config {
	db: DbConfig
	redis: RedisConfig
}

export type { Config, DbConfig, RedisConfig }
