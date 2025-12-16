class HttpError extends Error {
	code: number

	constructor(code: number, message: string) {
		super(message)
		this.code = code
		this.name = 'HTTP_ERROR'
	}

	toObject() {
		return {
			status: this.code,
			error: this.name,
			message: this.message,
		}
	}
}

class NotFoundError extends HttpError {
	constructor(message: string) {
		super(404, message)
		this.name = 'NOT_FOUND_ERROR'
	}
}

class ConflictError extends HttpError {
	constructor(message: string) {
		super(409, message)
		this.name = 'CONFLICT_ERROR'
	}
}

class PermissionsError extends HttpError {
	constructor() {
		super(403, "You don't have the required permissions")
		this.name = 'PERMISSIONS_ERROR'
	}
}

class UnauthorizedError extends HttpError {
	constructor() {
		super(401, 'You are not authenticated')
		this.name = 'UNAUTHORIZED_ERROR'
	}
}

class InternalServerError extends HttpError {
	constructor() {
		super(500, 'An unexpected error occurred on the server')
		this.name = 'INTERNAL_SERVER_ERROR'
	}
}

export {
	HttpError,
	NotFoundError,
	InternalServerError,
	ConflictError,
	PermissionsError,
	UnauthorizedError,
}
