package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import paw.my_mess.db_service.persistence.entities.Friendship
import paw.my_mess.db_service.persistence.persistence.interfaces.IFriendRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.FriendshipRowMapper

@Repository
class FriendRepository: IFriendRepository<Friendship>, GenericRepository<Friendship>() {

    private val tableName = "friends"

    init {
        this._rowMapper = FriendshipRowMapper()
    }

    override fun add(item: Friendship): String? {
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (uid1, uid2) VALUES (?, ?)",
                item.uid1.toLong(),
                item.uid2.toLong()
        )
        val friendshipTest = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE uid1=? AND uid2=?",
                this._rowMapper,
                item.uid1.toLong(),
                item.uid2.toLong()
        )
        return if (friendshipTest.isEmpty()) null else friendshipTest[0].friendShipId
    }

    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update("DELETE FROM ${this.tableName} WHERE friendshipid = ?",
                    id.toLong()
            ) != 0

    override fun get(id: String): Friendship? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE friendshipid = ?",
                this._rowMapper,
                id.toLong()
        )
        return if (tmp.isEmpty()) null else tmp[0]
    }

    override fun getAll(): List<Friendship> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName}",
                    this._rowMapper
            )

    override fun update(id: String, item: Friendship): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET uid1=?, uid2=? WHERE friendshipid=?",
                    item.uid1.toLong(),
                    item.uid2.toLong(),
                    id.toLong()
            ) != 0

    override fun getFriendsByUserId(userId: String): List<Friendship> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName} WHERE uid1=? OR uid2=?",
                    this._rowMapper,
                    userId.toLong(),
                    userId.toLong()
            )

    override fun deleteFriendByUsersId(userId: String, targetId: String): Boolean =
            this._jdbcTemplate.update("DELETE FROM ${this.tableName} WHERE (uid1=? AND uid2=?) OR (uid1=? AND uid2=?)",
                    userId.toLong(),
                    targetId.toLong(),
                    targetId.toLong(),
                    userId.toLong()
            ) != 0
}