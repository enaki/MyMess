package paw.my_mess.db_service.persistence.persistence.postgresql.repositories

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper

abstract class GenericRepository<T> {
    @Autowired
    protected lateinit var _jdbcTemplate: JdbcTemplate
    protected lateinit var _rowMapper: RowMapper<T>
}