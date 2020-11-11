package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import paw.my_mess.db_service.persistence.entities.BlockedUser
import paw.my_mess.db_service.persistence.persistence.interfaces.IBlockedUserRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.BlockedUserRowMapper

@Repository
class BlockedUserRepository: GenericRepository<BlockedUser>(), IBlockedUserRepository<BlockedUser> {
    private val tableName = "blocked_users"
    init {
        _rowMapper = BlockedUserRowMapper()
    }

    override fun getAll(): List<BlockedUser> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName}",
                    this._rowMapper
            )

    override fun add(item: BlockedUser): String? {
        this._jdbcTemplate.update(
                "INSERT INTO ${this.tableName} (uid, targetid) VALUES (?, ?)",
                item.uid.toLong(),
                item.targetId.toLong()
        )
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE uid=? AND targetid=?",
                this._rowMapper,
                item.uid.toLong(),
                item.targetId.toLong()
        )
        return if (tmp.isEmpty()) null else tmp[0].blockedUsersId
    }

    override fun get(id: String): BlockedUser? {
        val tmp = this._jdbcTemplate.query(
                "SELECT * FROM ${this.tableName} WHERE blockeduserid=?",
                this._rowMapper,
                id.toLong()
        )
        return if (tmp.isEmpty()) null else tmp[0]
    }

    override fun delete(id: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE blockeduserid=?",
                    id.toLong()
            ) !=0

    override fun update(id: String, item: BlockedUser): Boolean =
            this._jdbcTemplate.update(
                    "UPDATE ${this.tableName} SET uid=?, targetid=? WHERE blockeduserid=?",
                    item.uid,
                    item.targetId,
                    id.toLong()
            ) != 0

    override fun getBlockedUsersByUserId(userId: String): List<BlockedUser> =
            this._jdbcTemplate.query(
                    "SELECT * FROM ${this.tableName} WHERE uid=?",
                    this._rowMapper,
                    userId.toLong()
            )

    override fun deleteBlockedUserByIds(userId: String, targetId: String): Boolean =
            this._jdbcTemplate.update(
                    "DELETE FROM ${this.tableName} WHERE uid=? AND targetid=?",
                    userId.toLong(),
                    targetId.toLong()
            ) !=0
}