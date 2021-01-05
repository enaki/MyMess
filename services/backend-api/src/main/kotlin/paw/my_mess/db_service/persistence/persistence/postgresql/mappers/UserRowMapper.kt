package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.User
import java.sql.ResultSet

class UserRowMapper: RowMapper<User> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): User? {
        return User(resultSet.getString("uid"),
                resultSet.getString("username"),
                resultSet.getString("passwordHash"),
                resultSet.getString("firstname"),
                resultSet.getString("lastname"),
                resultSet.getString("email"),
                resultSet.getString("avatarPath")
        )
    }
}