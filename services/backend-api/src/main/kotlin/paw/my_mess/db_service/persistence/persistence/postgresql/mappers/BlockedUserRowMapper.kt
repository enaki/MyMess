package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.BlockedUser
import java.sql.ResultSet

class BlockedUserRowMapper: RowMapper<BlockedUser>{
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): BlockedUser? {
        return BlockedUser(
                resultSet.getString("blockedUserId"),
                resultSet.getString("uid"),
                resultSet.getString("targetId")
        )
    }
}