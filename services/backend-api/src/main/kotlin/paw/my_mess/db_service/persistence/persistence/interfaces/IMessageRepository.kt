package paw.my_mess.db_service.persistence.persistence.interfaces

interface IMessageRepository<Message>:IRepository<Message> {
    fun getMessagesByChatId(chatId: String): List<Message>
    fun delete(chatId: String, id: String): Boolean
}