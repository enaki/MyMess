package paw.my_mess.db_service.persistence.entities

import org.springframework.data.annotation.Id
import javax.persistence.Entity

data class UserChat(
    var chatId: String,
    var uid: String
)