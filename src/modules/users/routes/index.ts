import type { Routes } from '@/core/types/routes.js'
import {
	generateFailedHttpResponse,
	generateFailedValidationResponse,
	generateSuccessResponse,
} from '@/core/utils/schemas.js'
import { createUser, getUsers } from '../handlers/index.js'
import { CREATE_USER_SCHEMA, USER_SCHEMA } from '../schemas/index.js'

export const getUsersRoutes = (): Routes => ({
	routes: [
		{
			method: 'GET',
			url: '/users',
			handler: getUsers,
			schema: {
				summary: 'Get all users',
				description: 'This endpoint retrieves a list of all users.',
				tags: ['Users'],
				response: {
					200: generateSuccessResponse(USER_SCHEMA.array()).describe(
						'Users retrieved successfully',
					),
				},
			},
		},
		{
			method: 'POST',
			url: '/users',
			handler: createUser,
			schema: {
				summary: 'Create a new user',
				description: 'This endpoint allows you to create a new user.',
				tags: ['Users'],
				body: CREATE_USER_SCHEMA,
				response: {
					201: generateSuccessResponse(USER_SCHEMA).describe(
						'User created successfully',
					),
					400: generateFailedValidationResponse(),
					409: generateFailedHttpResponse(409).describe(
						'User with such name already exists',
					),
					500: generateFailedHttpResponse(500).describe(
						'Internal server error',
					),
				},
			},
		},
	],
})
