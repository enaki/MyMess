package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.Chat
import paw.my_mess.db_service.persistence.persistence.interfaces.IChatRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.ChatRowMapper

@Repository
class ChatRepository : GenericRepository<Chat>(), IChatRepository<Chat> {
    private val tableName = "chats"

    init {
        _rowMapper = ChatRowMapper()
    }

    override fun getAll(): List<Chat> {
        return _jdbcTemplate.query("SELECT * FROM ${tableName}", _rowMapper)
    }

    override fun add(item: Chat): String? {
        val result = _jdbcTemplate.update("INSERT INTO ${tableName} (chatId) VALUES (default)")

        return if (result == 0) null else item.chatId
    }

    override fun get(id: String): Chat? {
        val chatList = _jdbcTemplate.query("SELECT * FROM ${tableName} WHERE chatId=?", _rowMapper, id.toLong())

        return if (chatList.isEmpty()) null else chatList[0]
    }

    override fun delete(id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM ${tableName} WHERE chatId=?", id.toLong()) != 0
    }

    override fun update(id: String, item: Chat): Boolean {
        throw Exception("Not implemented")
    }
}