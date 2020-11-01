package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import paw.my_mess.db_service.persistence.entities.FriendRequest
import paw.my_mess.db_service.persistence.persistence.interfaces.IRequestFriendRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.RequestFriendRowMapper

class RequestFriendRepository: GenericRepository<FriendRequest>(), IRequestFriendRepository<FriendRequest> {
    private val tableName = "friend_request"
    init {
        _rowMapper = RequestFriendRowMapper()
    }

    /**
     * [getAll] method queries the friend request table and returns all the friend requests existing in the database.
     * @return a [List] of [FriendRequest] that contains all the friend records registered in the database.
     */
    override fun getAll(): List<FriendRequest> =
        this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName}",
                this._rowMapper
        )

    /**
     * [add] method adds a new friendRequest to the database.
     * @param item the new [FriendRequest] record to be introduced in the database.
     * @return a [String?] indicating the new [friendRequestId] registered in the database.
     */
    override fun add(item: FriendRequest): String? {
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (fromid, toid) VALUES (?, ?)",
                item.fromId,
                item.toId
        )
        val friendRequestTest = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE fromid=?, toid=?",
                this._rowMapper,
                item.fromId,
                item.toId
        )
        return if (friendRequestTest.isEmpty()) null else friendRequestTest[0].friendRequestId
    }

    /**
     * [get] method gets a specific [FriendRequest] from the database by its [friendRequestId].
     * @param id the id to be searched in the database.
     * @return a [FriendRequest?] valid entity if the specified [friendRequestId] was found or null otherwise.
     */
    override fun get(id: String): FriendRequest? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE friendrequestid=?",
                this._rowMapper,
                id.toLong()
        )
        return if(tmp.isEmpty()) null else tmp[0]
    }

    /**
     * [delete] method deletes a record from the database by the specified [id].
     * @param id the id record to be deleted in the database.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE friendrequestid=?",
                    this._rowMapper,
                    id.toLong()
            ) != 0

    /**
     * [update] method updates a record from the database by the specified [id] with the new data from [item].
     * @param id the id record to be updated in the database.
     * @param item the entity with updated values.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    override fun update(id: String, item: FriendRequest): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET fromid=?, toid=? WHERE friendrequestid=?",
                    item.fromId,
                    item.toId,
                    id.toLong()
            ) !=0

}