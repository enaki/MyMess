package paw.my_mess.db_service.persistence.persistence.interfaces

interface IBlockedUserRepository<BlockedUser>:IRepository<BlockedUser> {
    fun getBlockedUsersByUserId(userId: String): List<BlockedUser>
    fun deleteBlockedUserByIds(userId: String, targetId: String): Boolean
}