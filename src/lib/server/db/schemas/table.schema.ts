import { DBEnums, DBJoins, DBModels } from "../utils/db-names";
import * as t from "drizzle-orm/pg-core";
import { genreEnum, systemEnum } from "./general.enums";
import { gm, player } from "./user.schema";
import { timestamps } from "../utils/helpers";

export const tableSchema = t.pgSchema(DBModels.TABLE);

export const tableType = tableSchema.enum(DBEnums.TABLE_TYPE, [
    "campaign",
    "oneshot",
]);

export const tableStatus = tableSchema.enum(DBEnums.TABLE_STATUS, [
    "open",
    "ongoing",
    "finished",
]);

export const defaultQuestions = tableSchema.enum(DBEnums.DEFAULT_QUESTION, [
    "rpg_definition",
    "rpg_experience",
    "favorite_rpg_element",
    "character_creation",
    "rpg_moment",
    "memorable_character",
    "rpg_campaign",
    "rpg_challenge",
    "rpg_system_preference",
    "rpg_homebrew",
    "good_gm",
    "good_player",
    "expectations",
    "character_death",
    "dislike",
    "like",
    "sensible_content",
    "about_homebrew",
    "about_rules",
    "fav_culture_character",
    "fav_songs",
    "fav_song_style",
    "character_concept",
]);

export const applicationStatus = tableSchema.enum(DBEnums.APPLICATION_STATUS, [
    "pending",
    "accepted",
    "rejected",
]);

export const formStatus = tableSchema.enum(DBEnums.FORM_STATUS, [
    "open",
    "closed",
    "archived",
]);

export const table = tableSchema.table(DBModels.TABLE, {
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

export const table2users = tableSchema.table(
    DBJoins.TABLE_TO_USERS,
    {
        tableId: t.integer().references(() => table.id),
        userId: t.text().references(() => gm.uid),
    },
    (table) => [t.primaryKey({ columns: [table.tableId, table.userId] })]
);

export const customAnswer = tableSchema.table(
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

export const defaultAnswer = tableSchema.table(
    DBModels.DEFAULT_ANSWER,
    {
        playerId: t.text().references(() => player.uid),

        question: defaultQuestions().notNull(),
        answer: t.text().notNull(),
    },
    (table) => [t.primaryKey({ columns: [table.playerId, table.question] })]
);

export const form = tableSchema.table(DBModels.FORM, {
    tableId: t
        .integer()
        .references(() => table.id)
        .primaryKey(),

    introduction: t.text().notNull(),
    defaultQuestions: defaultQuestions().array(),
    customQuestions: t.text().array(),
    status: formStatus().notNull().default(formStatus.enumValues[0]),

    createdAt: timestamps.createdAt,
});

export const application = tableSchema.table(DBModels.APPLICATION, {
    id: t.serial().primaryKey(),
    formId: t.integer().references(() => form.tableId),
    playerId: t.text().references(() => player.uid),

    status: applicationStatus()
        .notNull()
        .default(applicationStatus.enumValues[0]),

    ...timestamps,
});
