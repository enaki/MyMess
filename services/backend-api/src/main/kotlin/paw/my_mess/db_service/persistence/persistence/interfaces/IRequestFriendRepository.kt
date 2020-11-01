package paw.my_mess.db_service.persistence.persistence.interfaces


interface IRequestFriendRepository<FriendRequest>: IRepository<FriendRequest> {
    fun deleteFriendRequestByUsersId(senderId: String, receiverId: String): Boolean
}