import type { AppInstance, FailureResponse } from '@/core/types/common.js'
import { env } from '@/env.js'
import { registerDependencies } from '@/infrastructure/parentDiConfig.js'
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
	createJsonSchemaTransform,
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getRoutes } from './modules/index.js'

export class App {
	private readonly app: AppInstance

	constructor() {
		this.app = fastify({
			logger: {
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
					},
				},
			},
		})
	}

	private async registerPlugins(): Promise<void> {
		this.app.setValidatorCompiler(validatorCompiler)
		this.app.setSerializerCompiler(serializerCompiler)

		await this.app.register(fastifyCors, {
			origin: '*', // TODO: Change to your origin(s)
			// credentials: true, // remember origin shouldn't be *, otherwise it won't work
			methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		})

		await this.app.register(fastifySwagger, {
			transform: createJsonSchemaTransform({
				skipList: [
					'/documentation',
					'/documentation/initOAuth',
					'/documentation/json',
					'/documentation/uiConfig',
					'/documentation/yaml',
					'/documentation/*',
					'/documentation/static/*',
					'*',
				],
			}),
			openapi: {
				info: {
					title: 'Awesome Backend',
					description: 'Awesome starter template for Node.js backend',
					version: '1.0.0',
				},
			},
		})

		await this.app.register(scalarApiReference, {
			routePrefix: '/api', // TODO: Change to your prefix
			configuration: {
				theme: 'deepSpace',
				metaData: {
					title: 'Awesome Backend API Reference',
					description: 'Awesome starter template for Node.js backend',
				},
			},
		})

		this.app.setErrorHandler((error, request, reply) => {
			if (hasZodFastifySchemaValidationErrors(error)) {
				const errObj = {
					success: false,
					data: null,
					error: {
						error: 'Response Validation Error',
						message: "Request doesn't match the schema",
						status: 400,
						details: {
							issues: error.validation,
							method: request.method,
							url: request.url,
						},
					},
				} satisfies FailureResponse

				return reply.status(400).send(errObj)
			}

			if (isResponseSerializationError(error)) {
				const errObj = {
					success: false,
					data: null,
					error: {
						error: 'Response Serialization Error',
						message: "Response doesn't match the schema",
						status: 500,
						details: {
							issues: error.cause.issues,
							method: request.method,
							url: request.url,
						},
					},
				} satisfies FailureResponse

				return reply.status(500).send(errObj)
			}
		})

		await this.app.register(fastifyAwilixPlugin, {
			disposeOnClose: true,
			asyncDispose: true,
			asyncInit: true,
			eagerInject: true,
			disposeOnResponse: true,
		})

		await this.app.register(fastifyCookie, {
			secret: env.COOKIE_SECRET,
			hook: 'preHandler',
		})

		await this.app.register(fastifyRateLimit, {
			max: 100,
			ban: 150,
			timeWindow: 15 * 1000,
			allowList: ['127.0.0.1'],
		})

		registerDependencies(diContainer, { app: this.app })
	}

	private registerRoutes(): void {
		const { routes } = getRoutes()

		this.app.register(
			(instance, _, done) => {
				for (const route of routes) {
					instance.withTypeProvider<ZodTypeProvider>().route(route)
				}

				done()
			},
			{ prefix: '/api' },
		)
	}

	async initialize(): Promise<AppInstance> {
		try {
			await this.registerPlugins()

			this.app.after(() => {
				this.registerRoutes()
			})

			await this.app.ready()

			return this.app
		} catch (e: unknown) {
			this.app.log.error('Error while initializing app ', e)

			throw e
		}
	}
}
