import type { HttpError } from '../types/index.js'

const INTERNAL_SERVER_ERR: HttpError = {
	status: 500,
	error: 'Internal Server Error',
	message: 'An unexpected error occurred on the server',
}

export { INTERNAL_SERVER_ERR }
