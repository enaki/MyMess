package paw.my_mess.db_service.persistence.entities

import org.springframework.data.annotation.Id
import javax.persistence.Entity

data class Chat(
    var chatId: String,
    var uid: String
)