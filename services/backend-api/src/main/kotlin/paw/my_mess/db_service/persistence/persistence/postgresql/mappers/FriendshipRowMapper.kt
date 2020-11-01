package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.Friendship
import java.sql.ResultSet

class FriendshipRowMapper: RowMapper<Friendship>{
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): Friendship? {
        return Friendship(
                resultSet.getString("friendShipId"),
                resultSet.getString("uid1"),
                resultSet.getString("uid2")
        )
    }
}