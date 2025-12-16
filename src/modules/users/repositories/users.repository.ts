import { DUPLICATE_KEY_ERR_CODE } from '@/core/constants/db.js'
import { InternalServerError, type HttpError } from '@/core/utils/errors.js'
import { userTable } from '@/db/schema/user.js'
import type { User } from '@/db/types.js'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { err, ok, Result } from 'neverthrow'
import postgres from 'postgres'
import { UserAlreadyExistsError } from '../errors/index.js'
import type { CreateUser } from '../schemas/index.js'
import type {
	UsersInjectableDependencies,
	UsersRepository,
} from '../types/index.js'

export class UsersRepositoryImpl implements UsersRepository {
	private readonly db: PostgresJsDatabase

	constructor({ db }: UsersInjectableDependencies) {
		this.db = db.client
	}

	async findAll(): Promise<User[]> {
		return this.db.select().from(userTable)
	}

	async createOne({ name }: CreateUser): Promise<Result<User, HttpError>> {
		try {
			const [user] = await this.db
				.insert(userTable)
				.values({ name })
				.returning()

			return ok(user!)
		} catch (e: unknown) {
			if (
				e instanceof Error &&
				e.cause instanceof postgres.PostgresError &&
				e.cause.code === DUPLICATE_KEY_ERR_CODE
			) {
				return err(new UserAlreadyExistsError(name))
			}

			return err(new InternalServerError())
		}
	}
}
