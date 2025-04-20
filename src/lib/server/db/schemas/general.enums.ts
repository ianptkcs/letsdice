import { DBEnums } from "../utils/db-names";
import { pgEnum } from "drizzle-orm/pg-core";

export const systemEnum = pgEnum(DBEnums.SYSTEM, ["own", "coc", "dnd", "op"]);
export const genreEnum = pgEnum(DBEnums.GENRE, [
    "Fantasy",
    "SciFi",
    "Horror",
    "Cyberpunk",
    "Superhero",
    "Western",
    "PostApocalyptic",
    "Historical",
    "Mystery",
    "Thriller",
    "Romance",
    "Comedy",
    "Drama",
    "Action",
    "Adventure",
]);
