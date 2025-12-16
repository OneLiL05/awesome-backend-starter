import type {
	CommonDependencies,
	ExternalDependencies,
} from '@/core/types/deps.js'
import { asFunction, type NameAndRegistrationPair } from 'awilix'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { getConfig } from './config.js'
import { Redis } from 'ioredis'
import { EnhancedQueryLogger } from 'drizzle-query-logger'

export const resolveCommonDiConfig = (
	dependencies: ExternalDependencies,
): NameAndRegistrationPair<CommonDependencies> => ({
	db: asFunction(
		({ config }: CommonDependencies) => {
			const { user, password, host, port, database } = config.db

			const queryClient = postgres({
				username: user,
				password,
				host,
				port,
				database,
			})

			return {
				client: drizzle(queryClient, {
					logger: new EnhancedQueryLogger(),
					casing: 'snake_case',
				}),
				connection: queryClient,
			}
		},
		{
			dispose: ({ connection }) => {
				connection.end()
			},
		},
	).singleton(),
	redis: asFunction(
		({ config }: CommonDependencies) => {
			const { user, password, port, host } = config.redis

			const redis = new Redis({
				port,
				host,
				username: user,
				password: password,
			})

			return redis
		},
		{
			dispose: (redis) => {
				redis.disconnect()
			},
		},
	).singleton(),
	logger: asFunction(() => dependencies.app.log).singleton(),
	config: asFunction(() => getConfig()).singleton(),
})
