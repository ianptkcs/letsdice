import { pgEnum } from "drizzle-orm/pg-core";
import { DBEnums } from "../../utils/db-names";

export const tableType = pgEnum(DBEnums.TABLE_TYPE, [
    "campaign",
    "oneshot",
]);

export const tableStatus = pgEnum(DBEnums.TABLE_STATUS, [
    "open",
    "ongoing",
    "finished",
]);

export const defaultQuestions = pgEnum(DBEnums.DEFAULT_QUESTION, [
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

export const applicationStatus = pgEnum(DBEnums.APPLICATION_STATUS, [
    "pending",
    "accepted",
    "rejected",
]);

export const formStatus = pgEnum(DBEnums.FORM_STATUS, [
    "open",
    "closed",
    "archived",
]);
