package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.UserProfile
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserProfileRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.UserProfileRowMapper

@Repository
class UserProfileRepository: GenericRepository<UserProfile>(), IUserProfileRepository<UserProfile> {
    private val tableName = "user_profiles"
    init {
        _rowMapper = UserProfileRowMapper()
    }

    override fun getAll(): List<UserProfile> {
        return _jdbcTemplate.query("SELECT * FROM ${tableName}", _rowMapper)
    }

    override fun add(item: UserProfile): String? {
        _jdbcTemplate.update("""INSERT INTO ${tableName} (uid, status, birthdate, gender, dateRegistered, city, country) VALUES (?, ?, ?, ?, ?, ?, ?)""", item.uid.toLong(), item.status, item.birthdate, item.gender, item.dateRegistered, item.city, item.country)
        return item.uid
    }

    override fun get(id: String): UserProfile? {
        val userList = _jdbcTemplate.query("SELECT * FROM ${tableName} WHERE uid = ? ", _rowMapper, id.toLong())
        return if (userList.isEmpty()) null else userList.get(0)
    }

    override fun delete(id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM ${tableName} WHERE uid=?", id.toLong()) != 0
    }

    override fun update(id: String, item: UserProfile): Boolean {
        val code = _jdbcTemplate.update("""UPDATE ${tableName} SET status=?, birthdate=?, gender=?, dateRegistered=?, city=?, country=? WHERE uid=?""",
                item.status, item.birthdate, item.gender, item.dateRegistered, item.city, item.country, id.toLong())
        return code != 0
    }
}