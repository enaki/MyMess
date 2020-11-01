package paw.my_mess.db_service.persistence.persistence.interfaces

interface IFriendRepository<Friendship>: IRepository<Friendship> {
    fun getFriendsByUserId(userId: String): List<Friendship>
    fun deleteFriendByUsersId(userId: String, targetId: String): Boolean
}