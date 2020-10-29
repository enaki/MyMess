package paw.my_mess.db_service.persistence.persistence.interfaces

interface IRepository<T> {
    fun getAll(): List<T>
    fun add(item: T): List<T>
    fun get(id: Long): T?
    fun delete(id: Long): Boolean
    fun update(id: Long, item: T): Boolean
}