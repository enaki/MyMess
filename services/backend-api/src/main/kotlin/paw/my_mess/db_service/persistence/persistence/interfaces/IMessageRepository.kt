package paw.my_mess.db_service.persistence.persistence.interfaces

interface IMessageRepository<Message>:IRepository<Message> {
    fun getMessagesByChatId(chatId: String): List<Message>
}