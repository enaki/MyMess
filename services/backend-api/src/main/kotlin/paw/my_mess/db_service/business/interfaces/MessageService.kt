package paw.my_mess.db_service.business.interfaces

import paw.my_mess.db_service.business.bussines_models.create.BusinessCreateMessage
import paw.my_mess.db_service.business.bussines_models.get.BusinessId
import paw.my_mess.db_service.business.bussines_models.get.BusinessMessage
import paw.my_mess.db_service.business.error_handling.Response


interface MessageService {
    fun getAllMessages(): Response<List<BusinessMessage>>
    fun createMessage(message: BusinessCreateMessage): Response<Any?>
    fun getChatMessages(chatID: String): Response<List<BusinessMessage>>
    fun getChatId(uid1: String, uid2: String): Response<BusinessId?>
    fun deleteMessage(chatID: String, messageID: String): Response<Any?>
    fun replyMessage(chatID: String, messageID: String): Response<Any?>
    fun getMessageById(messageId: String): Response<Any?>
}