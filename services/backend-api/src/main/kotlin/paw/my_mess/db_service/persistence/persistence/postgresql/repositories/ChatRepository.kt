package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.Chat
import paw.my_mess.db_service.persistence.persistence.interfaces.IChatRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.ChatRowMapper

@Service
class ChatRepository : GenericRepository<Chat>(), IChatRepository<Chat> {
    init {
        _rowMapper = ChatRowMapper()
    }

    override fun getAll(): List<Chat> {
        return _jdbcTemplate.query("SELECT * FROM chats", _rowMapper)
    }

    override fun add(item: Chat): String? {
        val result = _jdbcTemplate.update("INSERT INTO chats (chatId) VALUES (default)")

        return if (result == 0) null else item.chatId
    }

    override fun get(id: String): Chat? {
        val chatList = _jdbcTemplate.query("SELECT * FROM chats WHERE chatId=?", _rowMapper, id.toLong())

        return if (chatList.isEmpty()) null else chatList[0]
    }

    override fun delete(id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM chats WHERE chatId=?", id.toLong()) != 0
    }

    override fun update(id: String, item: Chat): Boolean {
        throw Exception("Not implemented")
    }
}