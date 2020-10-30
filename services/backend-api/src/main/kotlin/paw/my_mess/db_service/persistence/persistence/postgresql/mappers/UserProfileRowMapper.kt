package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.UserProfile
import java.sql.ResultSet

class UserProfileRowMapper: RowMapper<UserProfile> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): UserProfile? {
        return UserProfile(
                resultSet.getString("uid"),
                resultSet.getString("status"),
                resultSet.getDate("birthdate"),
                resultSet.getString("gender"),
                resultSet.getDate("dateRegistered"),
                resultSet.getString("city"),
                resultSet.getString("country")
        )
    }
}