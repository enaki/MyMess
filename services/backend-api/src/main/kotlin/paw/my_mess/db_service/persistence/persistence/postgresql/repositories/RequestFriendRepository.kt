package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import paw.my_mess.db_service.persistence.entities.FriendRequest
import paw.my_mess.db_service.persistence.persistence.interfaces.IRequestFriendRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.RequestFriendRowMapper
import java.sql.SQLDataException

@Repository
class RequestFriendRepository: GenericRepository<FriendRequest>(), IRequestFriendRepository<FriendRequest> {
    private val tableName = "friend_requests"
    init {
        _rowMapper = RequestFriendRowMapper()
    }

    override fun getAll(): List<FriendRequest> =
        this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName}",
                this._rowMapper
        )

    override fun add(item: FriendRequest): String? {
        val friendRequestSearch = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE (fromid=? AND toid=?) OR (fromid=? AND toid=?)",
                this._rowMapper,
                item.fromId.toLong(),
                item.toId.toLong(),
                item.toId.toLong(),
                item.fromId.toLong()
        )
        if (friendRequestSearch.isNotEmpty()) throw Throwable("Pair of friend request values (${item.fromId}, ${item.toId}) already existent in the database")
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (fromid, toid) VALUES (?, ?)",
                item.fromId.toLong(),
                item.toId.toLong()
        )
        val friendRequestTest = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE fromid=? AND toid=?",
                this._rowMapper,
                item.fromId.toLong(),
                item.toId.toLong()
        )
        return if (friendRequestTest.isEmpty()) null else friendRequestTest[0].friendRequestId
    }

    override fun get(id: String): FriendRequest? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE friendrequestid=?",
                this._rowMapper,
                id.toLong()
        )
        return if(tmp.isEmpty()) null else tmp[0]
    }

    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE friendrequestid=?",
                    id.toLong()
            ) != 0

    override fun update(id: String, item: FriendRequest): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET fromid=?, toid=? WHERE friendrequestid=?",
                    item.fromId,
                    item.toId,
                    id.toLong()
            ) !=0

    override fun deleteFriendRequestByUsersId(senderId: String, receiverId: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE fromid=? AND toid=?",
                    senderId.toLong(),
                    receiverId.toLong()
            ) != 0

    override fun getFriendRequestsOfUserId(userId: String): List<FriendRequest>{
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE toId=?",
                this._rowMapper,
                userId.toLong()
        )
        return tmp
    }
}