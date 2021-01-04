package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.Message
import paw.my_mess.db_service.persistence.persistence.interfaces.IMessageRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.MessageRowMapper

@Repository
class MessageRepository : GenericRepository<Message>(), IMessageRepository<Message> {
    private val tableName = "messages"
    init {
        _rowMapper = MessageRowMapper()
    }

    override fun get(id: String): Message? {
        val msgList = _jdbcTemplate.query("SELECT * FROM ${tableName} WHERE messageId=?", _rowMapper, id.toLong())

        return if (msgList.isEmpty()) null else msgList[0]
    }

    override fun getAll(): List<Message> {
        return _jdbcTemplate.query("SELECT * FROM ${tableName}", _rowMapper)
    }

    override fun getMessagesByChatId(chatId: String): List<Message> {
        return _jdbcTemplate.query("SELECT * FROM ${tableName} WHERE chatId=?", _rowMapper, chatId.toLong())
    }

    override fun add(item: Message): String? {
        var query = "INSERT INTO ${tableName} (chatId, ownerId, replyToMessageId, text, imagePath, date) VALUES (?, ?, ?, ?, ?, ?)"
        _jdbcTemplate.update(query, item.chatId.toLong(), item.ownerId.toLong(), item.replyToMessageId?.toLong(), item.text, item.imagePath, item.date)

        query = "SELECT * from messages WHERE chatId=? AND ownerId=? AND text=? AND date=?"
        val msgList = _jdbcTemplate.query(query, _rowMapper, item.chatId.toLong(), item.ownerId.toLong(), item.text, item.date)

        return if (msgList.isEmpty()) null else msgList[0].messageId
    }

    override fun update(id: String, item: Message): Boolean {
        val query = "UPDATE ${tableName} SET chatId=?, ownerId=?, text=?, imagePath=?, date=? WHERE messageId=?"

        return _jdbcTemplate.update(query, item.chatId.toLong(), item.ownerId.toLong(), item.text, item.imagePath, item.date, id.toLong()) != 0
    }

    override fun delete(id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM ${tableName} WHERE messageId=?", id.toLong()) != 0
    }

    override fun delete(chatId: String, id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM ${tableName} WHERE messageId=? AND chatId=?", id.toLong(), chatId.toLong()) != 0
    }
}