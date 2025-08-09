import type { HttpError } from '@/core/types/common.js'

const USER_ALREADY_EXISTS_ERR: HttpError = {
	status: 409,
	error: 'User already exists',
	message: 'User with such name already exists',
}

export { USER_ALREADY_EXISTS_ERR }
