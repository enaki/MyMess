package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.Chat
import java.sql.ResultSet

class ChatRowMapper : RowMapper<Chat> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): Chat? {
        return Chat(resultSet.getString("chatId"),
                resultSet.getString("uid"))
    }
}