package paw.my_mess.db_service.persistence.entities

data class BlockedUser (
        var blockedUsersId: String,
        var uid: String,
        var targetId: String
)