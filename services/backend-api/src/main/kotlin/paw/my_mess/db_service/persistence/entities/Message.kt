package paw.my_mess.db_service.persistence.entities

import java.sql.Date

data class Message(
    var messageId: String,
    var chatId: String,
    var ownerId: String,
    var text: String?,
    var imagePath: String?,
    var date: Date
)