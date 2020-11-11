package paw.my_mess.db_service.persistence.persistence.postgresql.mappers

import org.springframework.jdbc.core.RowMapper
import paw.my_mess.db_service.persistence.entities.FriendRequest
import java.sql.ResultSet

class RequestFriendRowMapper: RowMapper<FriendRequest>{
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): FriendRequest? {
        return FriendRequest(
                resultSet.getString("friendRequestId"),
                resultSet.getString("fromId"),
                resultSet.getString("toId")
        )
    }

}