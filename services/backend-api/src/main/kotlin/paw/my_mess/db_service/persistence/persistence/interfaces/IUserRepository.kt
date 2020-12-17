package paw.my_mess.db_service.persistence.persistence.interfaces

interface IUserRepository<User>: IRepository<User> {
    fun findByUsername(username: String): paw.my_mess.db_service.persistence.entities.User?
}