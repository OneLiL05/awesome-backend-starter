import { integer, timestamp } from 'drizzle-orm/pg-core'

const baseTableAttrs = {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp({ withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp({ withTimezone: true, mode: 'date' })
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date()),
}

export { baseTableAttrs }
