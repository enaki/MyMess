package paw.my_mess.db_service.business.bussines_models.get

import java.time.LocalDateTime

data class BusinessMessage(
        var messageId: String,
        var chatId: String,
        var ownerId: String,
        var text: String?,
        var imagePath: String?,
        var date: LocalDateTime
)

