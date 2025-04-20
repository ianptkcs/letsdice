import { DBJoins, DBModels } from "../../utils/db-names";
import * as t from "drizzle-orm/pg-core";
import { genreEnum, systemEnum } from "../../utils/db-enums";
import { gm, player } from "../../schemas/user/schema";
import { timestamps } from "../../utils/helpers";
import { applicationStatus, defaultQuestions, formStatus, tableStatus, tableType } from "../../schemas/table/enums";

export const table = t.pgTable(DBModels.TABLE, {
    id: t.serial().primaryKey(),
    gmId: t.text().references(() => gm.uid),

    title: t.text().notNull(),
    banner: t.text().notNull(),
    description: t.text().notNull(),
    system: systemEnum().notNull(),
    vacancies: t.integer().notNull(),
    minAge: t.integer().default(0),
    genres: genreEnum().array().notNull(),
    startDate: t.date().notNull().defaultNow(),
    type: tableType().notNull().default(tableType.enumValues[0]),
    status: tableStatus().notNull().default(tableStatus.enumValues[0]),

    ...timestamps,
});

export const table2users = t.pgTable(
    DBJoins.TABLE_TO_USERS,
    {
        tableId: t.integer().references(() => table.id),
        userId: t.text().references(() => gm.uid),
    },
    (table) => [t.primaryKey({ columns: [table.tableId, table.userId] })]
);

export const form = t.pgTable(DBModels.FORM, {
    tableId: t
        .text()
        .references(() => table.id)
        .primaryKey(),

    introduction: t.text().notNull(),
    defaultQuestions: defaultQuestions().array(),
    customQuestions: t.text().array(),
    status: formStatus().notNull().default(formStatus.enumValues[0]),

    createdAt: timestamps.created_at,
});

export const application = t.pgTable(DBModels.APPLICATION, {
    id: t.serial().primaryKey(),
    formId: t.integer().references(() => form.tableId),
    playerId: t.text().references(() => table.id),

    status: applicationStatus()
        .notNull()
        .default(applicationStatus.enumValues[0]),

    ...timestamps,
});

export const customAnswer = t.pgTable(
    DBModels.CUSTOM_ANSWER,
    {
        applicationId: t.integer().references(() => application.id),

        question: t.text().notNull(),
        answer: t.text().notNull(),
    },
    (table) => [
        t.primaryKey({ columns: [table.applicationId, table.question] }),
    ]
);

export const defaultAnswer = t.pgTable(
    DBModels.DEFAULT_ANSWER,
    {
        playerId: t.text().references(() => player.uid),

        question: defaultQuestions().notNull(),
        answer: t.text().notNull(),
    },
    (table) => [t.primaryKey({ columns: [table.playerId, table.question] })]
);
