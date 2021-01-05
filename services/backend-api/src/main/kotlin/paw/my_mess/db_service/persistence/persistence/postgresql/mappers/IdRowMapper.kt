package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class IdRowMapper: RowMapper<String> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): String? {
        return resultSet.getString("chatId");
    }

}