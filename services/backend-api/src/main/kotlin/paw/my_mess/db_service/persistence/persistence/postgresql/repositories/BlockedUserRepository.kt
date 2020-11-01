package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import paw.my_mess.db_service.persistence.entities.BlockedUser
import paw.my_mess.db_service.persistence.persistence.interfaces.IBlockedUserRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.BlockedUserRowMapper

class BlockedUserRepository: GenericRepository<BlockedUser>(), IBlockedUserRepository<BlockedUser> {
    private val tableName = "blocked_users"
    init {
        _rowMapper = BlockedUserRowMapper()
    }

    /**
     * [getAll] method queries the blocked user table and returns all the blocked user relationships existing in the database.
     * @return a [List] of [BlockedUser] that contains all the blocked user relationships registered in the database.
     */
    override fun getAll(): List<BlockedUser> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName}",
                    this._rowMapper
            )

    /**
     * [add] method adds a new blockedUser to the database.
     * @param item the new [BlockedUser] record to be introduced in the database.
     * @return a [String?] indicating the new [blockedUserId] registered in the database.
     */
    override fun add(item: BlockedUser): String? {
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (uid, targetid) VALUES (?, ?)",
                item.uid,
                item.targetId
        )
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE uid=?, targetid=?",
                this._rowMapper,
                item.uid,
                item.targetId
        )
        return if (tmp.isEmpty()) null else tmp[0].blockedUserId
    }

    /**
     * [get] method gets a specific [BlockedUser] from the database by its [blockedUserId].
     * @param id the id to be searched in the database.
     * @return a [BlockedUser?] valid entity if the specified [blockedUserId] was found or null otherwise.
     */
    override fun get(id: String): BlockedUser? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE blockeduserid=?",
                this._rowMapper,
                id.toLong()
        )
        return if (tmp.isEmpty()) null else tmp[0]
    }

    /**
     * [delete] method deletes a record from the database by the specified [id].
     * @param id the id record to be deleted in the database.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE blockeduserid=?",
                    this._rowMapper,
                    id.toLong()
            ) !=0

    /**
     * [update] method updates a record from the database by the specified [id] with the new data from [item].
     * @param id the id record to be updated in the database.
     * @param item the entity with updated values.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    override fun update(id: String, item: BlockedUser): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET uid=?, targetid=? WHERE blockeduserid=?",
                    item.uid,
                    item.targetId,
                    id.toLong()
            ) != 0
}