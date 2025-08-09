import { asClass } from 'awilix'
import { UsersRepositoryImpl } from './repositories/UsersRepository.js'
import { UsersServiceImpl } from './services/UsersService.js'
import type { UsersDiConfig } from './types/index.js'

export const resolveUsersModule = (): UsersDiConfig => ({
	usersRepository: asClass(UsersRepositoryImpl).singleton(),
	usersService: asClass(UsersServiceImpl).singleton(),
})
