import * as t from "drizzle-orm/pg-core";
import { timestamps } from "../../utils/helpers";
import { DBModels } from "../../utils/db-names";
import { systemEnum, genreEnum } from "../../utils/db-enums";
import { genderEnum } from "../../schemas/user/enums";

export const user = t.pgTable(DBModels.USER, {
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

export const player = t.pgTable(DBModels.PLAYER, {
    uid: t.text().references(() => user.supId),

    systems: systemEnum().array(),
    genres: genreEnum().array(),
});

export const gm = t.pgTable(DBModels.GM, {
    uid: t.text().references(() => user.supId),

    systems: systemEnum().array(),
    genres: genreEnum().array(),
});
