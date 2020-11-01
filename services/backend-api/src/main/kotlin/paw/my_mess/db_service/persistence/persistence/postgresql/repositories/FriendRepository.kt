package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import paw.my_mess.db_service.persistence.entities.Friendship
import paw.my_mess.db_service.persistence.persistence.interfaces.IFriendRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.FriendshipRowMapper

class FriendRepository: IFriendRepository<Friendship>, GenericRepository<Friendship>() {

    private val tableName = "friends"

    init {
        this._rowMapper = FriendshipRowMapper()
    }

    /**
     * [add] method adds a new [Friendship] record in the friend table, based on the request received by the REST controller.
     * @param item a [Friendship] entity that needs to be inserted in the database.
     * @return the [uid] of the new record inserted in the table or [null] for a failed operation.
     */
    override fun add(item: Friendship): String? {
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (uid1, uid2) VALUES (?, ?)",
                item.uid1,
                item.uid2
        )
        val friendshipTest = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE uid1=?, uid2=?",
                this._rowMapper,
                item.uid1,
                item.uid2
        )
        return if (friendshipTest.isEmpty()) null else friendshipTest[0].friendShipId
    }

    /**
     * [delete] deletes an existing friendship by id.
     * @param id the id of the friendship to be deleted.
     * @return a [Boolean] value which indicates if the delete operation was successful.
     */
    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update("DELETE FROM ${this.tableName} WHERE friendshipid = ?",
                    this._rowMapper,
                    id.toLong()
            ) != 0

    /**
     * [get] gets from the database a friendship by its id.
     * @param id the id of the friendship to be searched.
     * @return A [Friendship?] valid entity if it exists or a null one.
     */
    override fun get(id: String): Friendship? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE friendshipid = ?",
                this._rowMapper,
                id.toLong()
        )
        return if (tmp.isEmpty()) null else tmp[0]
    }


    /**
     * This method gets all the friendships from the database.
     * @return a [List][<Friendship>] of all the friendships present in the database.
     */
    override fun getAll(): List<Friendship> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName}",
                    this._rowMapper
            )

    /**
     * [update] updates an existing friendship by a given [id] and a [Friendship] data class.
     * @param id the id of the friendship to be updated.
     * @param item the data class containing the updated info.
     * @return a [Boolean] value which indicates if the update operation was successful.
     */
    override fun update(id: String, item: Friendship): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET uid1=?, uid2=? WHERE friendshipid=?",
                    item.uid1,
                    item.uid2,
                    id.toLong()
            ) != 0
}