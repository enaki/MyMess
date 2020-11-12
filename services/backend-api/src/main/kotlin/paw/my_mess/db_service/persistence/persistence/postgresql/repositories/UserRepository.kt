package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Service
import paw.my_mess.db_service.persistence.entities.User
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserRepository
import paw.my_mess.db_service.persistence.persistence.postgresql.mappers.UserRowMapper

@Service
class UserRepository: GenericRepository<User>(), IUserRepository<User> {
    private val tableName = "users"
    init {
        _rowMapper = UserRowMapper()
    }

    override fun getAll(): List<User> {
        return _jdbcTemplate.query("SELECT * FROM ${tableName}", _rowMapper)
    }

    override fun add(item: User): String? {
        _jdbcTemplate.update("""INSERT INTO ${tableName} (username, passwordHash, email, avatarPath) VALUES (?, ?, ?, ?)""", item.username, item.passwordHash, item.email, item.avatarPath)
        val userList =  _jdbcTemplate.query("SELECT * from users WHERE username=?", _rowMapper, item.username)
        return if (userList.isEmpty()) null else userList.get(0).uid
    }

    //throws NumberFormatException  if id is not Long
    override fun get(id: String): User? {
        val userList = _jdbcTemplate.query("SELECT * FROM ${tableName} WHERE uid = ? ", _rowMapper, id.toLong())
        return if (userList.isEmpty()) null else userList.get(0)
    }

    // daca jdbc update returneaza 0 then INSUCCESS OPERATION
    override fun delete(id: String): Boolean {
        return _jdbcTemplate.update("DELETE FROM ${tableName} WHERE uid=?", id.toLong()) != 0
    }

    override fun update(id: String, item: User): Boolean {
        val code = _jdbcTemplate.update("""UPDATE ${tableName} SET username=?, passwordHash=?, email=?, avatarPath=? WHERE uid=?""", item.username, item.passwordHash, item.email, item.avatarPath, id.toLong())
        return code != 0
    }

}