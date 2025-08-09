import z from 'zod'

const HEALTH_CHECK_SCHEMA = z
	.object({
		uptime: z.number().positive().describe('Uptime in seconds'),
		message: z.string().describe('Health check message'),
		date: z.date().describe('Health check date'),
	})
	.describe('Health check response')

export { HEALTH_CHECK_SCHEMA }
