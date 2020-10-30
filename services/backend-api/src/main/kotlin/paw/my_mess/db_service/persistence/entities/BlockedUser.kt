package paw.my_mess.db_service.persistence.entities

data class BlockedUser (
        var blockedUserId: String,
        var uid: String,
        var targetId: String
)