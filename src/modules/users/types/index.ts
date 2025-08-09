import type { BaseDiConfig, InjectableDependencies } from '@/core/types/deps.js'
import type {
	BaseResponse,
	HttpError,
	SuccessResponse,
} from '@/core/types/index.js'
import type { User } from '@/db/types.js'
import type { Result } from 'neverthrow'
import type { CREATE_USER_TYPE } from '../schemas/index.js'

interface UsersRepository {
	findAll: () => Promise<User[]>
	createOne: (data: CREATE_USER_TYPE) => Promise<Result<User, HttpError>>
}

interface UsersService {
	findAll: () => Promise<SuccessResponse<User[]>>
	createOne: (data: CREATE_USER_TYPE) => Promise<BaseResponse<User>>
}

interface UsersModuleDependencies {
	usersRepository: UsersRepository
	usersService: UsersService
}

type UsersInjectableDependencies =
	InjectableDependencies<UsersModuleDependencies>

type UsersDiConfig = BaseDiConfig<UsersModuleDependencies>

export type {
	UsersDiConfig,
	UsersInjectableDependencies,
	UsersModuleDependencies,
	UsersRepository,
	UsersService,
}
