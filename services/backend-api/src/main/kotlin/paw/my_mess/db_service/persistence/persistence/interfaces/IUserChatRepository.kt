package paw.my_mess.db_service.persistence.persistence.interfaces

interface IUserChatRepository<UserChat> : IRepository<UserChat> {
    fun getChat(chatId: String, ownerId: String): UserChat?
    fun getChatID(uid1: String, uid2: String): String?
}