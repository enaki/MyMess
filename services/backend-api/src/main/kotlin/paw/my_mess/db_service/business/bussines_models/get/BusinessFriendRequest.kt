package paw.my_mess.db_service.business.bussines_models.get

data class BusinessFriendRequest (
        var friendRequestId: String,
        var fromId: String,
        var toId: String
)