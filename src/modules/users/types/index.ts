import type { BaseDiConfig, InjectableDependencies } from '@/core/types/deps.js'
import type { HttpError } from '@/core/utils/errors.js'
import type { User } from '@/db/types.js'
import type { Result } from 'neverthrow'
import type { CreateUser } from '../schemas/index.js'

interface UsersRepository {
	findAll: () => Promise<User[]>
	createOne: (data: CreateUser) => Promise<Result<User, HttpError>>
}

interface UsersModuleDependencies {
	usersRepository: UsersRepository
}

type UsersInjectableDependencies =
	InjectableDependencies<UsersModuleDependencies>

type UsersDiConfig = BaseDiConfig<UsersModuleDependencies>

export type {
	UsersDiConfig,
	UsersInjectableDependencies,
	UsersModuleDependencies,
	UsersRepository,
}
