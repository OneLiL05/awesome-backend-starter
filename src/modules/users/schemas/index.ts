import { z } from 'zod'

const UserSchema = z.object({
	id: z.number().int().positive().describe('Unique identifier of the user'),
	createdAt: z.date().describe('Creation date of the user'),
	updatedAt: z.date().describe('Last update date of the user'),
	name: z.string().min(2).max(50).describe('Name of the user'),
})

const CreateUserSchema = UserSchema.pick({ name: true })

type CreateUser = z.infer<typeof CreateUserSchema>

export { UserSchema, CreateUserSchema }
export type { CreateUser }
