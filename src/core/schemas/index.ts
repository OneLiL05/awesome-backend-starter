import z from 'zod'

const HealthCheckSchema = z
	.object({
		uptime: z.number().positive().describe('Uptime in seconds'),
		message: z.string().describe('Health check message'),
		date: z.date().describe('Health check date'),
	})
	.describe('Health check response')

export { HealthCheckSchema }
