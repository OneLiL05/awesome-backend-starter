import { throwHttpError } from '@/core/utils/common.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CREATE_USER_TYPE } from '../schemas/index.js'

export const getUsers = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const { usersService } = request.diScope.cradle

	const users = await usersService.findAll()

	const message = !users.data.length
		? 'No users found'
		: 'Users retrieved successfully'

	return reply.status(200).send({ ...users, message })
}

export const createUser = async (
	request: FastifyRequest<{ Body: CREATE_USER_TYPE }>,
	reply: FastifyReply,
) => {
	const { usersService } = request.diScope.cradle

	const result = await usersService.createOne(request.body)

	console.log(result)

	if (!result.success) return throwHttpError(reply, result)

	return reply.status(201).send(result)
}
