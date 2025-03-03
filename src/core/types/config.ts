interface DbConfig {
	user: string
	password: string
	host: string
	port: number
	database: string
}

interface Config {
	db: DbConfig
}

export type { Config, DbConfig }
