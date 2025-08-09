import type { Routes } from '@/core/types/routes.js'
import { getUsersRoutes } from './users/routes/index.js'
import { HEALTH_CHECK_SCHEMA } from '@/core/schemas/index.js'

export const getRoutes = (): Routes => {
	const { routes: usersRoutes } = getUsersRoutes()

	return {
		routes: [
			{
				method: 'GET',
				url: '/health',
				handler: (_, reply) => {
					const data = {
						uptime: process.uptime(),
						message: 'Healthy!',
						data: new Date(),
					}

					return reply.status(200).send(data)
				},
				schema: {
					tags: ['System Check'],
					summary: 'Get system status',
					response: {
						200: HEALTH_CHECK_SCHEMA,
					},
				},
			},
			...usersRoutes,
		],
	}
}
