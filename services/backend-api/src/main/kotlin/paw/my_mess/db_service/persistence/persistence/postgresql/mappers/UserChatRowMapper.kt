package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.UserChat
import java.sql.ResultSet

class UserChatRowMapper : RowMapper<UserChat> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): UserChat? {
        return UserChat(resultSet.getString("chatId"),
                resultSet.getString("uid"))
    }
}