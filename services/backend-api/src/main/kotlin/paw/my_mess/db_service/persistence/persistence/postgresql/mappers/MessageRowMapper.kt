package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.Message
import java.sql.ResultSet
import java.time.LocalDateTime


class MessageRowMapper : RowMapper<Message> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): Message? {
        return Message(resultSet.getString("messageId"),
                resultSet.getString("chatId"),
                resultSet.getString("ownerId"),
                resultSet.getString("text"),
                resultSet.getString("imagePath"),
                resultSet.getObject("date", LocalDateTime::class.java)
        )
    }
}