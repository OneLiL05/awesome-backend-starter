import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateUser } from '../schemas/index.js'

export const getUsers = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const { usersRepository } = request.diScope.cradle

	const users = await usersRepository.findAll()

	return reply.status(200).send(users)
}

export const createUser = async (
	request: FastifyRequest<{ Body: CreateUser }>,
	reply: FastifyReply,
) => {
	const { usersRepository } = request.diScope.cradle

	const result = await usersRepository.createOne(request.body)

	return result.match(
		(user) => reply.status(201).send(user),
		(error) => reply.status(error.code).send(error.toObject()),
	)
}
