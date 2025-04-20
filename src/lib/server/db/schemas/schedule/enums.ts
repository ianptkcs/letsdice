import { pgEnum } from "drizzle-orm/pg-core";
import { DBEnums } from "../../utils/db-names";

export const weekday = pgEnum(DBEnums.WEEKDAY, [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]);