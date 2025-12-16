import z, { ZodType } from 'zod'
import type { FailureResponse } from '../types/common.js'

export const generateFailureResponse = (
	type: 'http' | 'validation',
	statusCode: number,
): ZodType<FailureResponse> => {
	const validationErrorSchema = z.object({
		status: z.literal(statusCode).describe('HTTP status code'),
		error: z.string().describe('Error message'),
		message: z.string().describe('Detailed error message'),
		details: z
			.object({
				issues: z.array(z.any()).describe('Validation issues'),
				method: z.string().describe('HTTP method of the request'),
				url: z.string().describe('URL of the request'),
			})
			.describe('Additional error details'),
	})

	const httpErrorSchema = z.object({
		status: z.literal(statusCode).describe('HTTP status code'),
		error: z.string().describe('Error message'),
		message: z.string().describe('Detailed error message'),
	})

	return type === 'http' ? httpErrorSchema : validationErrorSchema
}

export const generateFailedValidationResponse = () =>
	generateFailureResponse('validation', 400).describe(
		'Validation failure response',
	)

export const generateFailedHttpResponse = (statusCode: number) =>
	generateFailureResponse('http', statusCode)
