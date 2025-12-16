import { asClass } from 'awilix'
import { UsersRepositoryImpl } from './repositories/users.repository.js'
import type { UsersDiConfig } from './types/index.js'

export const resolveUsersModule = (): UsersDiConfig => ({
	usersRepository: asClass(UsersRepositoryImpl).singleton(),
})
