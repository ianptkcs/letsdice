import { DBEnums, DBJoins, DBModels } from "../utils/db-names";
import * as t from "drizzle-orm/pg-core";
import { table } from "./table.schema";
import { player } from "./user.schema";

export const scheduleSchema = t.pgSchema(DBModels.SCHEDULE);

export const weekday = scheduleSchema.enum(DBEnums.WEEKDAY, [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]);

export const schedule = scheduleSchema.table(DBModels.SCHEDULE, {
    id: t.uuid().primaryKey(),

    weekday: weekday().notNull(),
    hours: t.integer().array().notNull(),
});

export const schedule2Table = scheduleSchema.table(
    DBJoins.SCHEDULE_TO_TABLE,
    {
        scheduleId: t.uuid().references(() => schedule.id),
        tableId: t.integer().references(() => table.id),
    },
    (table) => [t.primaryKey({ columns: [table.scheduleId, table.tableId] })]
);

export const schedule2Player = scheduleSchema.table(
    DBJoins.SCHEDULE_TO_PLAYER,
    {
        scheduleId: t.uuid().references(() => schedule.id),
        playerId: t.text().references(() => player.uid),
    },
    (table) => [t.primaryKey({ columns: [table.scheduleId, table.playerId] })]
);
