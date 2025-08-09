import type { BaseResponse, SuccessResponse } from '@/core/types/common.js'
import type {
	UsersInjectableDependencies,
	UsersRepository,
	UsersService,
} from '../types/index.js'
import type { User } from '@/db/types.js'
import { failureResponse, successResponse } from '@/core/utils/responses.js'
import type { CREATE_USER_TYPE } from '../schemas/index.js'

export class UsersServiceImpl implements UsersService {
	private readonly repository: UsersRepository

	constructor({ usersRepository }: UsersInjectableDependencies) {
		this.repository = usersRepository
	}

	async findAll(): Promise<SuccessResponse<User[]>> {
		const users = await this.repository.findAll()

		return successResponse(users)
	}

	async createOne(data: CREATE_USER_TYPE): Promise<BaseResponse<User>> {
		const result = await this.repository.createOne(data)

		return result.match(
			(user) => successResponse(user),
			(error) => failureResponse(error),
		)
	}
}
