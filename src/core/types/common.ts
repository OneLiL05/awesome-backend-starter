import type { FastifyInstance } from 'fastify'
import type http from 'node:http'

type AppInstance = FastifyInstance<
	http.Server,
	http.IncomingMessage,
	http.ServerResponse
>

interface HttpError {
	status: number
	error: string
	message: string
}

interface ValidationError {
	status: number
	error: string
	message: string
	details: {
		issues: unknown[]
		method: string
		url: string
	}
}

interface SuccessResponse<T> {
	success: true
	data: T
	message?: string
	error: null
}

interface FailureResponse {
	success: false
	data: null
	message?: string
	error: HttpError | ValidationError
}

type BaseResponse<T> = SuccessResponse<T> | FailureResponse

export type {
	AppInstance,
	BaseResponse,
	FailureResponse,
	HttpError,
	ValidationError,
	SuccessResponse,
}
