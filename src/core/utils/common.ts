import type { FastifyReply } from 'fastify'
import type { FailureResponse } from '../types/index.js'

export const throwHttpError = (reply: FastifyReply, error: FailureResponse) => {
	return reply.status(error.error.status).send(error)
}
