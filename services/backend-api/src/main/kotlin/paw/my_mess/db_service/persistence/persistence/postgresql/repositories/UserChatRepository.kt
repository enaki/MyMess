package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.UserChat
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserChatRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.IdRowMapper
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.UserChatRowMapper

@Repository
class UserChatRepository : GenericRepository<UserChat>(), IUserChatRepository<UserChat> {
    init {
        _rowMapper = UserChatRowMapper()
    }

    override fun getAll(): List<UserChat> {
        throw Exception("Not yet implemented")
    }

    override fun add(item: UserChat): String? {
        throw Exception("Not yet implemented")
    }

    override fun get(id: String): UserChat? {
        throw Exception("Not yet implemented")
    }

    override fun delete(id: String): Boolean {
        throw Exception("Not yet implemented")
    }

    override fun update(id: String, item: UserChat): Boolean {
        throw Exception("Not yet implemented")
    }

    override fun getChat(chatId: String, ownerId: String): UserChat? {
        val chatList = _jdbcTemplate.query("SELECT * FROM user_chats WHERE chatId=? AND uid=?", _rowMapper, chatId.toLong(), ownerId.toLong())
        return if (chatList.isEmpty()) null else chatList[0]
    }

    override fun getChatID(uid1: String, uid2: String): String? {
        val _idRowMapper = IdRowMapper()
        val chatId = _jdbcTemplate.query(
                "SELECT chatId FROM user_chats WHERE chatId IN (SELECT chatId FROM user_chats WHERE uid=?) AND uid=?",
                _idRowMapper, uid1.toLong(), uid2.toLong())
        if(chatId.size > 0)
            return chatId[0]
        else
            return null
    }
}