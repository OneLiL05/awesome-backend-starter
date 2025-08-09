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

	return z.object({
		success: z.literal(false).describe('Indicates failure'),
		data: z.null().describe('Response data is null on failure'),
		error: type === 'http' ? httpErrorSchema : validationErrorSchema,
	})
}

export const generateFailedValidationResponse = () =>
	generateFailureResponse('validation', 400).describe(
		'Validation failure response',
	)

export const generateFailedHttpResponse = (statusCode: number) =>
	generateFailureResponse('http', statusCode)

export const generateSuccessResponse = <T>(data: ZodType<T>) => {
	return z.object({
		success: z.literal(true).describe('Indicates success'),
		data: data.describe('Response data on success'),
		message: z.string().optional().describe('Optional success message'),
		error: z.null().describe('Error is null on success'),
	})
}
