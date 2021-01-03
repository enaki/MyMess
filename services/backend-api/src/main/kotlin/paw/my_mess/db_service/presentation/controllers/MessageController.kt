package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import paw.my_mess.db_service.business.bussines_models.create.BusinessCreateMessage
import paw.my_mess.db_service.business.error_handling.MyError
import paw.my_mess.db_service.business.interfaces.MessageService

@RestController

@RequestMapping("/api")
class MessageController {
    @Autowired
    private lateinit var _messageService: MessageService

    @RequestMapping(value = ["/messages"], method = [RequestMethod.GET])
    fun getMessages(): ResponseEntity<Any?> {
        val response = _messageService.getAllMessages()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/messages/{messageId}"], method = [RequestMethod.GET])
    fun getMessageById(@PathVariable("messageId") messageId: String): ResponseEntity<Any?> {
        val response = _messageService.getMessageById(messageId)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/messages"], method = [RequestMethod.POST])
    fun createMessage(@RequestBody message: BusinessCreateMessage): ResponseEntity<Any?> {
        val response = _messageService.createMessage(message)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/chat/{chatId}"], method = [RequestMethod.GET])
    fun getChatMessages(@PathVariable("chatId") chatId: String): ResponseEntity<Any?> {
        val response = _messageService.getChatMessages(chatId)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/chat/{chatId}"], method = [RequestMethod.DELETE])
    fun deleteMessage(@PathVariable("chatId") chatId: String, @RequestParam("messageId") id: String): ResponseEntity<Any?> {
        val response = _messageService.deleteMessage(chatId, id)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/chat/reply/{chatId}"], method = [RequestMethod.GET])
    fun replyMessage(@PathVariable("chatId") chatId: String, @RequestParam("messageId") id: String): ResponseEntity<Any?> {
        val response = _messageService.replyMessage(chatId, id)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }
}