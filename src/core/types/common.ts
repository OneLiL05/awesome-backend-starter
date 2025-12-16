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

type FailureResponse = HttpError | ValidationError

export type { AppInstance, FailureResponse, HttpError, ValidationError }
