import { INTERNAL_SERVER_ERR } from '@/core/constants/index.js'
import type { HttpError } from '@/core/types/common.js'
import { Failure, Success, type Result } from '@/core/utils/result.js'
import { userTable } from '@/db/schema/users.js'
import type { User } from '@/db/types.js'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import type { CREATE_USER_TYPE } from '../schemas/index.js'
import type {
	UsersInjectableDependencies,
	UsersRepository,
} from '../types/index.js'
import { USER_ALREADY_EXISTS_ERR } from '../constants/errors.js'

export class UsersRepositoryImpl implements UsersRepository {
	private readonly db: PostgresJsDatabase

	constructor({ db }: UsersInjectableDependencies) {
		this.db = db.client
	}

	async findAll(): Promise<User[]> {
		return this.db.select().from(userTable)
	}

	async createOne({
		name,
	}: CREATE_USER_TYPE): Promise<Result<User, HttpError>> {
		try {
			const [user] = await this.db
				.insert(userTable)
				.values({ name })
				.returning()

			return Success(user!)
		} catch (e: unknown) {
			if (
				e instanceof Error &&
				e.cause instanceof postgres.PostgresError &&
				e.cause.code === '23505'
			) {
				return Failure(USER_ALREADY_EXISTS_ERR)
			}

			return Failure(INTERNAL_SERVER_ERR)
		}
	}
}
