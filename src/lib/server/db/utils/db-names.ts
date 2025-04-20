export enum DBModels {
    USER = "user",
    TABLE = "table",
    PLAYER = "player",
    GM = "gm",
    SCHEDULE = "schedule",
    FORM = "form",
    CUSTOM_ANSWER = "customAnswer",
    DEFAULT_ANSWER = "defaultAnswer",
    APPLICATION = "application",
}

export enum DBEnums {
    GENDER = "gender",
    SYSTEM = "system",
    GENRE = "genre",
    TABLE_STATUS = "tableStatus",
    TABLE_TYPE = "tableType",
    APPLICATION_STATUS = "applicationStatus",
    FORM_STATUS = "formStatus",
    DEFAULT_QUESTION = "defaultQuestion",
    WEEKDAY = "weekday",
}

export enum DBJoins {
    SCHEDULE_TO_TABLE = "scheduleToTable",
    SCHEDULE_TO_PLAYER = "scheduleToPlayer",
    TABLE_TO_USERS = "tableToUsers",
}

export enum systemLabel {
    own = "Own",
    coc = "Call of Cthulhu",
    dnd = "Dungeons & Dragons",
    op = "Ordem Paranormal",
}
