import { DBJoins, DBModels } from "../../utils/db-names";
import * as t from "drizzle-orm/pg-core";
import { table } from "../../schemas/table/schema";
import { weekday } from "../../schemas/schedule/enums";

export const schedule = t.pgTable(DBModels.SCHEDULE, {
    id: t.uuid().primaryKey(),

    weekday: weekday().notNull(),
    hours: t.integer().array().notNull(),
});

export const schedule2Table = t.pgTable(
    DBJoins.SCHEDULE_TO_TABLE,
    {
        scheduleId: t.uuid().references(() => schedule.id),
        tableId: t.integer().references(() => table.id),
    },
    (table) => [t.primaryKey({ columns: [table.scheduleId, table.tableId] })]
);

export const schedule2Player = t.pgTable(
    DBJoins.SCHEDULE_TO_PLAYER,
    {
        scheduleId: t.uuid().references(() => schedule.id),
        playerId: t.text().references(() => table.id),
    },
    (table) => [t.primaryKey({ columns: [table.scheduleId, table.playerId] })]
);
