// import { SQL, sql, type InferSelectModel, type InferColumnsDataTypes } from 'drizzle-orm';
// import * as t from 'drizzle-orm/pg-core';
// import { DBEnums, DBModels, DBSchemas } from '../utils/db-names';
// import { timestamps } from '../utils/helpers';

// export const authSchema = t.pgSchema(DBSchemas.AUTH);

// export const sessionTable = authSchema.table(DBModels.SESSION, {
//     id: t.text().primaryKey(),
//     userId: t
//         .integer()
//         .references(() => userTable.id)
//         .unique()
//         .notNull(),

//     createdAt: timestamps.createdAt,
//     expiresAt: t.timestamp().notNull(),
// });

// export type Session = InferSelectModel<typeof sessionTable>;
// export function lower(email: t.AnyPgColumn): SQL {
//     return sql`lower(${email})`;
// }
