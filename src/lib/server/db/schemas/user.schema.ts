import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../utils/helpers";
import { DBEnums, DBModels } from "../utils/db-names";
import { systemEnum, genreEnum } from "./general.enums";

export const userSchema = t.pgSchema(DBModels.USER);

export const genderEnum = userSchema.enum(DBEnums.GENDER, [
    "male",
    "female",
    "nonbinary",
    "other",
]);

export const user = userSchema.table(DBModels.USER, {
    supId: t.text().primaryKey(),
    id: t.serial(),
    slug: t.text().unique().notNull(),

    userName: t.text().notNull(),
    realName: t.text(),
    avatar: t.text().notNull(),
    aboutMe: t.text().notNull(),
    birthDate: t.date(),
    gender: genderEnum(),

    ...timestamps,
});

export const player = userSchema.table(DBModels.PLAYER, {
    uid: t.text().references(() => user.supId).primaryKey(),

    systems: systemEnum().array(),
    genres: genreEnum().array(),
});

export const gm = userSchema.table(DBModels.GM, {
    uid: t.text().references(() => user.supId).primaryKey(),

    systems: systemEnum().array(),
    genres: genreEnum().array(),
});
