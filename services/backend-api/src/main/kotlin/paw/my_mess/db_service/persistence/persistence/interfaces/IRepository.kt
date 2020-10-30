package paw.my_mess.db_service.persistence.persistence.interfaces

interface IRepository<T> {
    fun getAll(): List<T>
    fun add(item: T): String?
    fun get(id: String): T?
    fun delete(id: String): Boolean
    fun update(id: String, item: T): Boolean
}