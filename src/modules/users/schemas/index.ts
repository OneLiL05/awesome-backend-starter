import { z } from 'zod'

const USER_SCHEMA = z.object({
	id: z.number().int().positive().describe('Unique identifier of the user'),
	createdAt: z.date().describe('Creation date of the user'),
	updatedAt: z.date().describe('Last update date of the user'),
	name: z.string().min(2).max(50).describe('Name of the user'),
})

const CREATE_USER_SCHEMA = USER_SCHEMA.pick({ name: true })

type CREATE_USER_TYPE = z.infer<typeof CREATE_USER_SCHEMA>

export { USER_SCHEMA, CREATE_USER_SCHEMA }
export type { CREATE_USER_TYPE }
