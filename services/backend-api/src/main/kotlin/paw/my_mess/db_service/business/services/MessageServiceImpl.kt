package paw.my_mess.db_service.business.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import paw.my_mess.db_service.business.bussines_models.create.BusinessCreateMessage
import paw.my_mess.db_service.business.bussines_models.get.BusinessId
import paw.my_mess.db_service.business.bussines_models.get.BusinessMessage
import paw.my_mess.db_service.business.bussines_models.get.ToBusinessMessage
import paw.my_mess.db_service.business.error_handling.Response
import paw.my_mess.db_service.business.interfaces.MessageService
import paw.my_mess.db_service.persistence.entities.Chat
import paw.my_mess.db_service.persistence.entities.Message
import paw.my_mess.db_service.persistence.entities.UserChat
import paw.my_mess.db_service.persistence.persistence.interfaces.IChatRepository
import paw.my_mess.db_service.persistence.persistence.interfaces.IMessageRepository
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserChatRepository
import java.time.LocalDateTime

@Service
class MessageServiceImpl : MessageService {

    @Autowired
    private lateinit var _messageRepository: IMessageRepository<Message>

    @Autowired
    private lateinit var _chatRepository: IChatRepository<Chat>

    @Autowired
    private lateinit var _userChatRepository: IUserChatRepository<UserChat>

    override fun getAllMessages(): Response<List<BusinessMessage>> {
        return try {
            val msgList = _messageRepository.getAll()
            Response(successful_operation = true, data = msgList.map { it.ToBusinessMessage() }, code = 200)
        } catch (e: Exception) {
            Response(successful_operation = false, data = null, code = 400, error = e.toString())
        }
    }

    override fun createMessage(message: BusinessCreateMessage): Response<Any?> {
        try {
            val chat = _userChatRepository.getChat(message.chatId, message.ownerId)
            if (chat == null) {
                return Response(successful_operation = false, data = Unit, code = 400, error = "Invalid chatId or ownerId")
            }
            val date = LocalDateTime.now()
            val uid = _messageRepository.add(Message(messageId = "", chatId = message.chatId, ownerId = message.ownerId, text = message.text, imagePath = message.imagePath, date = date))
            if (uid == null) {
                return Response(successful_operation = false, data = Unit, code = 400, error = "Can't create message")
            }
            return Response(successful_operation = true, data = BusinessId(uid), code = 201)
        } catch (e: Exception) {
            return Response(successful_operation = false, data = Unit, code = 400, error = e.toString())
        }
    }

    override fun getChatMessages(chatID: String): Response<List<BusinessMessage>> {
        return try {
            val chat = _chatRepository.get(chatID)
            if (chat == null) {
                return Response(successful_operation = false, data = null, code = 404, message = "Chat Not Found")
            }
            val msgList = _messageRepository.getMessagesByChatId(chatID)
            Response(successful_operation = true, data = msgList.map { it.ToBusinessMessage() }, code = 200)
        } catch (e: Exception) {
            Response(successful_operation = false, data = null, code = 400, error = e.toString())
        }
    }

    override fun deleteMessage(chatID: String, messageID: String): Response<Any?> {
        try {
            val result = _messageRepository.delete(chatID, messageID)
            if (!result) {
                return Response(successful_operation = false, data = Unit, code = 404, message = "Message Not Found")
            }
            return Response(successful_operation = true, data = Unit, code = 204)
        } catch (e: Exception) {
            return Response(successful_operation = false, data = null, code = 400, error = e.toString())
        }
    }

    override fun replyMessage(chatID: String, messageID: String): Response<Any?> {
        return Response(successful_operation = false, data = null, code = 400, message = "Not implemented")
    }
}