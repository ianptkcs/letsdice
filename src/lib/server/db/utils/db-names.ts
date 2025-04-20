export enum DBModels {
    USER = "user",
    TABLE = "table",
    PLAYER = "player",
    GM = "gm",
    SCHEDULE = "schedule",
    FORM = "form",
    CUSTOM_ANSWER = "custom_answer",
    DEFAULT_ANSWER = "default_answer",
    APPLICATION = "application",
}

export enum DBEnums {
    GENDER = "gender",
    SYSTEM = "system",
    GENRE = "genre",
    TABLE_STATUS = "table_status",
    TABLE_TYPE = "table_type",
    APPLICATION_STATUS = "application_status",
    FORM_STATUS = "form_status",
    DEFAULT_QUESTION = "default_question",
    WEEKDAY = "weekday",
}

export enum DBJoins {
    SCHEDULE_TO_TABLE = "schedule_to_table",
    SCHEDULE_TO_PLAYER = "schedule_to_player",
    TABLE_TO_USERS = "table_to_users",
}

export enum systemLabel {
    own = "Own",
    coc = "Call of Cthulhu",
    dnd = "Dungeons & Dragons",
    op = "Ordem Paranormal",
}
