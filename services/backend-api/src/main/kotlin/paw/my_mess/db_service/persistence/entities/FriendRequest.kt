package paw.my_mess.db_service.persistence.entities

data class FriendRequest (
        var friendRequestId: String,
        var fromId: String,
        var toId: String
)