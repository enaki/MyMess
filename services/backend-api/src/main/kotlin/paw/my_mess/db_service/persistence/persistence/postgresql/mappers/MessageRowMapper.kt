package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.Message
import java.sql.ResultSet


class MessageRowMapper : RowMapper<Message> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): Message? {
        return Message(resultSet.getString("id"),
                resultSet.getString("chatId"),
                resultSet.getString("ownerId"),
                resultSet.getString("text"),
                resultSet.getString("imagePath"),
                resultSet.getDate("date")
        )
    }
}