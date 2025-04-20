import { pgEnum } from "drizzle-orm/pg-core";
import { DBEnums } from "../../utils/db-names";

export const genderEnum = pgEnum(DBEnums.GENDER, [
    "male",
    "female",
    "nonbinary",
    "other",
]);