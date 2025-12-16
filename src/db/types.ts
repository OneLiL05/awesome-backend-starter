import type { userTable } from './schema/user.js'

type User = typeof userTable.$inferSelect

export type { User }
