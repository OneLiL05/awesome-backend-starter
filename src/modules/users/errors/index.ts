import { HttpError } from '@/core/utils/errors.js'

class UserAlreadyExistsError extends HttpError {
	constructor(name: string) {
		super(409, `User with name '${name}' already exists`)
	}
}

export { UserAlreadyExistsError }
